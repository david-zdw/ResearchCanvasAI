from __future__ import annotations

import base64
import binascii
import hashlib
import json
import re
import struct
from pathlib import Path
from typing import Any

from . import config
from .http_utils import UploadedFile
from .services.canvas_ops import quick_relayout, vectorize_bitmap_to_svg_file
from .services.image_provider import edit_image, generate_image, upscale_image
from .services.openai_compat import get_json
from .services.paper_reader import analyze_paper, extract_text
from .services.prompting import generate_prompt, improve_prompt, reverse_image_prompt, translate_prompt
from .store import get, load_state, new_id, now_iso, save_state, upsert


PROMPT_LIBRARY_SOURCE = Path(r"C:\Users\David\Documents\Codex\2026-04-26\new-chat-2\科研AI绘图提示词整理.md")
PROMPT_PRESET_SEED_SOURCE = config.ROOT_DIR / "app" / "prompt_presets_seed.json"


DEFAULT_PROMPT_PRESETS = [
    {
        "id": "preset_schematic",
        "name": "Clean scientific schematic",
        "prompt": "Nature-style clean vector-like scientific illustration, white background, balanced multi-panel layout, restrained teal and amber palette, consistent line weights, legible labels, clear arrows, no decorative stock-art elements.",
    },
    {
        "id": "preset_graphical_abstract",
        "name": "Graphical abstract",
        "prompt": "Cell journal graphical abstract style, central mechanism highlighted, left-to-right causal flow, clear hierarchy, minimal text, precise scientific icons, soft shadows only where they improve separation, publication-ready composition.",
    },
]


def _keyword_list(value: Any) -> list[str]:
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    if isinstance(value, str):
        return [item.strip() for item in re.split(r"[、,，/|;；\n]+", value) if item.strip()]
    return []


def _reference_image_from_text(text: str) -> str:
    match = re.search(r"\((https?://[^)]+)\)", text)
    if match:
        return match.group(1).strip()
    parts = text.split("：", 1)
    return parts[1].strip() if len(parts) > 1 else ""


def _preset_digest(category: str, name: str, index: int | None = None) -> str:
    seed = f"{category}::{name}::{index or 0}"
    return hashlib.md5(seed.encode("utf-8")).hexdigest()[:12]


def _fallback_prompt_presets() -> list[dict[str, Any]]:
    now = now_iso()
    return [
        {**preset, "created_at": now, "updated_at": now, "category": "模板", "reference_image": "", "keywords": [], "source": "fallback"}
        for preset in DEFAULT_PROMPT_PRESETS
    ]


def _load_seed_prompt_presets() -> list[dict[str, Any]]:
    if not PROMPT_PRESET_SEED_SOURCE.exists():
        return []
    try:
        payload = json.loads(PROMPT_PRESET_SEED_SOURCE.read_text(encoding="utf-8-sig"))
    except Exception:
        return []
    presets = payload.get("prompt_presets", payload)
    if isinstance(presets, dict):
        values = list(presets.values())
    elif isinstance(presets, list):
        values = presets
    else:
        values = []
    return [preset for preset in values if isinstance(preset, dict) and preset.get("id") and preset.get("prompt")]


def _load_prompt_library_presets() -> list[dict[str, Any]]:
    seed_presets = _load_seed_prompt_presets()
    if seed_presets:
        return seed_presets
    if not PROMPT_LIBRARY_SOURCE.exists():
        return _fallback_prompt_presets()
    try:
        markdown = PROMPT_LIBRARY_SOURCE.read_text(encoding="utf-8")
    except Exception:
        return _fallback_prompt_presets()
    presets: list[dict[str, Any]] = []
    current_category = "未分类"
    current_item: dict[str, Any] | None = None
    current_prompt_lines: list[str] = []
    in_prompt_block = False
    current_section = ""
    section_prompt_lines: list[str] = []
    in_section_block = False
    for raw_line in markdown.splitlines():
        line = raw_line.rstrip()
        stripped = line.strip()
        if stripped.startswith("## "):
            if current_item:
                if current_prompt_lines and not current_item.get("prompt"):
                    current_item["prompt"] = "\n".join(current_prompt_lines).strip()
                current_prompt_lines = []
                presets.append(current_item)
                current_item = None
            if in_section_block:
                in_section_block = False
                section_prompt_lines = []
            current_section = stripped[3:].strip()
            current_category = current_section if current_section not in {"分类速览", "通用提示词模板"} else current_category
            continue
        if stripped.startswith("### "):
            if current_item:
                if current_prompt_lines and not current_item.get("prompt"):
                    current_item["prompt"] = "\n".join(current_prompt_lines).strip()
                presets.append(current_item)
            current_prompt_lines = []
            in_prompt_block = False
            match = re.match(r"^###\s*(\d+)\.\s*(.+)$", stripped)
            item_index = int(match.group(1)) if match else None
            item_name = match.group(2).strip() if match else stripped[4:].strip()
            current_item = {
                "id": f"preset_{_preset_digest(current_category, item_name, item_index)}",
                "category": current_category or "未分类",
                "name": item_name,
                "prompt": "",
                "reference_image": "",
                "keywords": [],
                "source": "library",
                "source_index": item_index or 0,
            }
            continue
        if current_section == "通用提示词模板" and not current_item:
            if stripped.startswith("```"):
                in_section_block = not in_section_block
                if not in_section_block and section_prompt_lines:
                    now = now_iso()
                    presets.append(
                        {
                            "id": "preset_template_general",
                            "category": "模板",
                            "name": "通用提示词模板",
                            "prompt": "\n".join(section_prompt_lines).strip(),
                            "reference_image": "",
                            "keywords": [],
                            "source": "library",
                            "source_index": 0,
                            "created_at": now,
                            "updated_at": now,
                        }
                    )
                    section_prompt_lines = []
                continue
            if in_section_block:
                section_prompt_lines.append(line)
            continue
        if not current_item:
            continue
        if stripped.startswith("```"):
            in_prompt_block = not in_prompt_block
            if not in_prompt_block and current_prompt_lines and not current_item.get("prompt"):
                current_item["prompt"] = "\n".join(current_prompt_lines).strip()
                current_prompt_lines = []
            continue
        if in_prompt_block:
            current_prompt_lines.append(line)
            continue
        if stripped.startswith("- 分类："):
            current_item["category"] = stripped.split("：", 1)[1].strip() or current_item["category"]
        elif stripped.startswith("- 示例图：") or stripped.startswith("- 效果参考图："):
            current_item["reference_image"] = _reference_image_from_text(stripped)
        elif stripped.startswith("- 关键词："):
            current_item["keywords"] = _keyword_list(stripped.split("：", 1)[1].strip())
    if current_item:
        if current_prompt_lines and not current_item.get("prompt"):
            current_item["prompt"] = "\n".join(current_prompt_lines).strip()
        presets.append(current_item)
    now = now_iso()
    for preset in presets:
        preset.setdefault("created_at", now)
        preset.setdefault("updated_at", now)
        preset.setdefault("reference_image", "")
        preset.setdefault("keywords", [])
        preset.setdefault("source", "library")
        preset["keywords"] = _keyword_list(preset.get("keywords"))
    filtered = [preset for preset in presets if preset.get("prompt")]
    return filtered or _fallback_prompt_presets()


def _seed_prompt_presets(state: dict[str, Any]) -> dict[str, Any]:
    if state.get("prompt_preset_library_seeded"):
        return state
    existing = state.setdefault("prompt_presets", {})
    for preset in _load_prompt_library_presets():
        existing.setdefault(preset["id"], preset)
    state["prompt_preset_library_seeded"] = True
    save_state(state)
    return state


def upload_paper(files: list[UploadedFile]) -> dict[str, Any]:
    if not files:
        raise ValueError("Please upload a paper file")
    uploaded = files[0]
    paper_id = new_id("paper")
    target = config.UPLOAD_DIR / f"{paper_id}_{uploaded.filename}"
    target.write_bytes(uploaded.data)
    text = extract_text(target)
    analysis = analyze_paper(text)
    paper = {
        "id": paper_id,
        "filename": uploaded.filename,
        "path": str(target),
        "created_at": now_iso(),
        **analysis,
    }
    upsert("papers", paper)
    return {"paper": _public_paper(paper)}


def upload_image(files: list[UploadedFile]) -> dict[str, Any]:
    if not files:
        raise ValueError("Please upload an image file")
    images = []
    for uploaded in files:
        if uploaded.content_type and not uploaded.content_type.startswith("image/"):
            continue
        image_id = new_id("img")
        suffix = Path(uploaded.filename).suffix.lower() or ".png"
        target = config.ASSET_DIR / f"{image_id}{suffix}"
        target.write_bytes(uploaded.data)
        image = {
            "id": image_id,
            "title": uploaded.filename,
            "prompt": "",
            "path": str(target),
            "url": f"/assets/{target.name}",
            "mime_type": uploaded.content_type or "image/png",
            "source": "upload",
            "provider_note": "",
            "created_at": now_iso(),
        }
        image.update(_image_dimensions(target))
        upsert("images", image)
        images.append(image)
    if not images:
        raise ValueError("Uploaded files are not images")
    return {"image": images[0], "images": images}


def make_prompt(payload: dict[str, Any]) -> dict[str, Any]:
    paper_id = payload.get("paper_id")
    paper = get("papers", paper_id) if paper_id else None
    if not paper:
        paper = {
            "title": payload.get("title", "Untitled research"),
            "abstract": payload.get("context", ""),
            "methods": "",
            "results": "",
            "keywords": [],
            "figure_candidates": [],
        }
    prompt = generate_prompt(
        paper=paper,
        goal=payload.get("goal", ""),
        figure_type=payload.get("figure_type", ""),
        style=payload.get("style", ""),
        model=payload.get("model") or payload.get("text_model"),
    )
    return {"prompt": prompt}


def rewrite_prompt(payload: dict[str, Any]) -> dict[str, Any]:
    return {
        "prompt": improve_prompt(
            payload.get("prompt", ""),
            payload.get("instruction", ""),
            model=payload.get("model") or payload.get("text_model"),
        )
    }


def translate_prompt_text(payload: dict[str, Any]) -> dict[str, Any]:
    return {
        "prompt": translate_prompt(
            payload.get("prompt", ""),
            direction=payload.get("direction", "auto"),
            model=payload.get("model") or payload.get("text_model"),
        )
    }


def reverse_prompt(payload: dict[str, Any]) -> dict[str, Any]:
    image = _lookup_image_path(payload.get("image_id"))
    if not image:
        raise ValueError("Image is required")
    return {
        "prompt": reverse_image_prompt(
            image,
            instruction=payload.get("instruction", ""),
            model=payload.get("model") or payload.get("text_model"),
        )
    }


def create_image(payload: dict[str, Any]) -> dict[str, Any]:
    prompt = payload.get("prompt", "")
    if not prompt:
        raise ValueError("Prompt is required")
    result = generate_image(
        prompt=prompt,
        size=payload.get("size", "1024x1024"),
        ratio=payload.get("ratio", "auto"),
        resolution=payload.get("resolution", "standard"),
        background=payload.get("background", "auto"),
        quality=payload.get("quality", "auto"),
        output_format=payload.get("output_format", "png"),
        n=int(payload.get("n", 1) or 1),
        model=payload.get("model"),
    )
    return _save_image(result, prompt, payload.get("title", "Generated figure"))


def edit_existing_image(payload: dict[str, Any]) -> dict[str, Any]:
    image_ids = payload.get("image_ids")
    if not image_ids:
        image_ids = [payload.get("image_id")]
    images = _lookup_image_paths(image_ids)
    result = edit_image(
        payload.get("prompt", "Refine this scientific figure"),
        source_paths=images,
        size=payload.get("size", "1024x1024"),
        ratio=payload.get("ratio", "auto"),
        resolution=payload.get("resolution", "standard"),
        quality=payload.get("quality", "auto"),
        output_format=payload.get("output_format", "png"),
        n=int(payload.get("n", 1) or 1),
        background=payload.get("background", "auto"),
        model=payload.get("model"),
    )
    return _save_image(result, payload.get("prompt", ""), payload.get("title", "Edited figure"))


def repaint_region(payload: dict[str, Any]) -> dict[str, Any]:
    image = _lookup_image_path(payload.get("image_id"))
    instruction = payload.get("instruction", "Repaint the selected region while preserving scientific meaning")
    mask_path = _save_mask_data_url(payload.get("mask_data_url"))
    result = edit_image(
        instruction,
        source_path=image,
        mask_path=mask_path,
        size=payload.get("size", "1024x1024"),
        ratio=payload.get("ratio", "auto"),
        resolution=payload.get("resolution", "standard"),
        quality=payload.get("quality", "auto"),
        output_format=payload.get("output_format", "png"),
        n=int(payload.get("n", 1) or 1),
        background=payload.get("background", "auto"),
        model=payload.get("model"),
    )
    return _save_image(result, instruction, payload.get("title", "Repainted figure"))


def upscale_existing_image(payload: dict[str, Any]) -> dict[str, Any]:
    image = _lookup_image_path(payload.get("image_id"))
    result = upscale_image(image, scale=int(payload.get("scale", 2)), model=payload.get("model"))
    return _save_image(result, "Upscale scientific figure", payload.get("title", "Upscaled figure"))


def vectorize_image(payload: dict[str, Any]) -> dict[str, Any]:
    image = get("images", payload.get("image_id", ""))
    if not image:
        raise ValueError("Image not found")
    image_path = Path(image["path"])
    svg_id = new_id("svg")
    target = config.ASSET_DIR / f"{svg_id}.svg"
    method = vectorize_bitmap_to_svg_file(image_path, target, image.get("title", "Vectorized figure"))
    asset = {
        "id": svg_id,
        "title": image.get("title", "Vectorized figure"),
        "path": str(target),
        "url": f"/assets/{target.name}",
        "mime_type": "image/svg+xml",
        "source": method,
        "provider_note": "Vectorized with VTracer." if method.startswith("vtracer") else "VTracer is not installed; embedded raster fallback was used.",
        "created_at": now_iso(),
        "source_image_id": image["id"],
    }
    if image.get("image_width") and image.get("image_height"):
        asset["image_width"] = image["image_width"]
        asset["image_height"] = image["image_height"]
    upsert("images", asset)
    return {"asset": asset}


def relayout(payload: dict[str, Any]) -> dict[str, Any]:
    return {
        "items": quick_relayout(
            payload.get("items", []),
            payload.get("mode", "grid"),
            payload.get("links", []),
        )
    }


def save_canvas(payload: dict[str, Any]) -> dict[str, Any]:
    canvas_id = payload.get("id") or new_id("canvas")
    canvas = {
        "id": canvas_id,
        "title": payload.get("title", "Research canvas"),
        "items": payload.get("items", []),
        "links": payload.get("links", []),
        "viewport": payload.get("viewport", {}),
        "updated_at": now_iso(),
    }
    upsert("canvases", canvas)
    return {"canvas": canvas}


def list_canvases() -> dict[str, Any]:
    canvases = list(load_state().get("canvases", {}).values())
    canvases.sort(key=lambda item: item.get("updated_at", ""), reverse=True)
    return {"canvases": canvases}


def latest_canvas() -> dict[str, Any]:
    canvases = list_canvases()["canvases"]
    return {"canvas": canvases[0] if canvases else None}


def load_canvas(canvas_id: str) -> dict[str, Any]:
    canvas = get("canvases", canvas_id)
    if not canvas:
        raise ValueError("Canvas not found")
    return {"canvas": canvas}


def list_prompt_presets() -> dict[str, Any]:
    state = _seed_prompt_presets(load_state())
    presets = state.setdefault("prompt_presets", {})
    changed = False
    for preset in presets.values():
        if not preset.get("category"):
            preset["category"] = "模板" if preset.get("id") in {"preset_schematic", "preset_graphical_abstract"} else "未分类"
            changed = True
        preset.setdefault("reference_image", "")
        preset["keywords"] = _keyword_list(preset.get("keywords", []))
    if changed:
        save_state(state)
    ordered = list(presets.values())
    ordered.sort(
        key=lambda item: (
            item.get("category", ""),
            item.get("source_index", 9999),
            item.get("updated_at", ""),
        )
    )
    return {"presets": ordered}


def save_prompt_preset(payload: dict[str, Any]) -> dict[str, Any]:
    preset_id = payload.get("id") or new_id("preset")
    name = str(payload.get("name", "")).strip() or "Untitled preset"
    prompt = str(payload.get("prompt", "")).strip()
    if not prompt:
        raise ValueError("Prompt preset content is required")
    category = str(payload.get("category", "")).strip() or "未分类"
    reference_image = str(payload.get("reference_image", "")).strip()
    keywords = _keyword_list(payload.get("keywords", []))
    existing = get("prompt_presets", preset_id) or {}
    preset = {
        "id": preset_id,
        "name": name,
        "category": category,
        "prompt": prompt,
        "reference_image": reference_image,
        "keywords": keywords,
        "source": existing.get("source", "custom"),
        "created_at": existing.get("created_at") or now_iso(),
        "updated_at": now_iso(),
    }
    upsert("prompt_presets", preset)
    return {"preset": preset, **list_prompt_presets()}


def delete_prompt_preset(payload: dict[str, Any]) -> dict[str, Any]:
    preset_id = payload.get("id")
    state = load_state()
    state.setdefault("prompt_presets", {}).pop(preset_id, None)
    save_state(state)
    return list_prompt_presets()


def get_settings() -> dict[str, Any]:
    return {"settings": config.public_settings()}


def save_settings(payload: dict[str, Any]) -> dict[str, Any]:
    return {"settings": config.save_runtime_settings(payload)}


def list_provider_models() -> dict[str, Any]:
    response = get_json("/v1/models")
    models = []
    for item in response.get("data", []):
        if isinstance(item, dict) and item.get("id"):
            models.append(item["id"])
    models = sorted(set(models))
    image_models = [model for model in models if "image" in model.lower() or "dall" in model.lower()]
    text_models = [model for model in models if model not in image_models]
    return {
        "models": models,
        "image_models": image_models or models,
        "text_models": text_models or models,
    }


def _save_image(result: dict[str, Any], prompt: str, title: str) -> dict[str, Any]:
    image_payloads = result.get("images") or [{"image_bytes": result["image_bytes"], "mime_type": result.get("mime_type", "image/png")}]
    saved_images = []
    for index, image_payload in enumerate(image_payloads):
        image_id = new_id("img")
        mime_type = image_payload.get("mime_type", result.get("mime_type", "image/png"))
        target = config.ASSET_DIR / f"{image_id}{_extension_for_mime(mime_type)}"
        target.write_bytes(image_payload["image_bytes"])
        image_title = title if len(image_payloads) == 1 else f"{title} {index + 1}"
        image = {
            "id": image_id,
            "title": image_title,
            "prompt": prompt,
            "path": str(target),
            "url": f"/assets/{target.name}",
            "mime_type": mime_type,
            "source": result.get("source", "api"),
            "provider_note": result.get("provider_note", ""),
            "created_at": now_iso(),
        }
        image.update(_image_dimensions(target))
        upsert("images", image)
        saved_images.append(image)
    return {"image": saved_images[0], "images": saved_images}


def _extension_for_mime(mime_type: str) -> str:
    return {
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/webp": ".webp",
        "image/svg+xml": ".svg",
    }.get(mime_type, ".png")


def _lookup_image_path(image_id: str | None) -> Path | None:
    if not image_id:
        return None
    image = get("images", image_id)
    if not image:
        raise ValueError("Image not found")
    return Path(image["path"])


def _lookup_image_paths(image_ids: list[str | None]) -> list[Path]:
    if isinstance(image_ids, str):
        image_ids = [image_ids]
    paths = []
    for image_id in image_ids:
        path = _lookup_image_path(image_id)
        if path:
            paths.append(path)
    return paths


def _save_mask_data_url(data_url: str | None) -> Path | None:
    if not data_url:
        return None
    value = str(data_url)
    if "," in value:
        header, value = value.split(",", 1)
        if not header.startswith("data:image/png"):
            raise ValueError("Mask must be a PNG data URL")
    try:
        mask_bytes = base64.b64decode(value, validate=True)
    except (binascii.Error, ValueError) as exc:
        raise ValueError("Mask data is invalid") from exc
    if not mask_bytes.startswith(b"\x89PNG\r\n\x1a\n"):
        raise ValueError("Mask must be PNG")
    target = config.ASSET_DIR / f"{new_id('mask')}.png"
    target.write_bytes(mask_bytes)
    return target


def _image_dimensions(path: Path) -> dict[str, int]:
    try:
        data = path.read_bytes()
        size = _png_dimensions(data) or _jpeg_dimensions(data) or _gif_dimensions(data) or _webp_dimensions(data)
        if not size:
            return {}
        width, height = size
        return {"image_width": width, "image_height": height}
    except Exception:
        return {}


def _png_dimensions(data: bytes) -> tuple[int, int] | None:
    if data.startswith(b"\x89PNG\r\n\x1a\n") and len(data) >= 24:
        return struct.unpack(">II", data[16:24])
    return None


def _gif_dimensions(data: bytes) -> tuple[int, int] | None:
    if data[:6] in (b"GIF87a", b"GIF89a") and len(data) >= 10:
        return struct.unpack("<HH", data[6:10])
    return None


def _jpeg_dimensions(data: bytes) -> tuple[int, int] | None:
    if not data.startswith(b"\xff\xd8"):
        return None
    index = 2
    while index + 9 < len(data):
        if data[index] != 0xFF:
            index += 1
            continue
        marker = data[index + 1]
        index += 2
        while marker == 0xFF and index < len(data):
            marker = data[index]
            index += 1
        if marker in (0xD8, 0xD9):
            continue
        if index + 2 > len(data):
            return None
        length = struct.unpack(">H", data[index : index + 2])[0]
        if length < 2 or index + length > len(data):
            return None
        if marker in {0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF}:
            height, width = struct.unpack(">HH", data[index + 3 : index + 7])
            return width, height
        index += length
    return None


def _webp_dimensions(data: bytes) -> tuple[int, int] | None:
    if len(data) < 30 or data[:4] != b"RIFF" or data[8:12] != b"WEBP":
        return None
    chunk = data[12:16]
    if chunk == b"VP8 " and len(data) >= 30:
        return struct.unpack("<HH", data[26:30])
    if chunk == b"VP8L" and len(data) >= 25:
        bits = int.from_bytes(data[21:25], "little")
        return (bits & 0x3FFF) + 1, ((bits >> 14) & 0x3FFF) + 1
    if chunk == b"VP8X" and len(data) >= 30:
        width = int.from_bytes(data[24:27], "little") + 1
        height = int.from_bytes(data[27:30], "little") + 1
        return width, height
    return None


def _public_paper(paper: dict[str, Any]) -> dict[str, Any]:
    allowed = {
        "id",
        "filename",
        "created_at",
        "title",
        "abstract",
        "methods",
        "results",
        "keywords",
        "figure_candidates",
        "preview",
        "char_count",
    }
    return {key: value for key, value in paper.items() if key in allowed}
