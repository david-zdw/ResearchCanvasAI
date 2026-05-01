from __future__ import annotations

import json
import re
import base64
import mimetypes
from pathlib import Path
from typing import Any

from app import config
from app.services.openai_compat import ProviderError, post_json


SYSTEM_PROMPT = """You are a scientific visualization director.
Return strict JSON with keys: title, prompt, negative_prompt, figure_type, panels, labels, rationale.
The image prompt must be precise, publication-ready, and suitable for a scientific figure generator."""


def generate_prompt(paper: dict[str, Any], goal: str, figure_type: str, style: str, model: str | None = None) -> dict[str, Any]:
    content = {
        "paper_title": paper.get("title", ""),
        "abstract": paper.get("abstract", ""),
        "methods": paper.get("methods", ""),
        "results": paper.get("results", ""),
        "keywords": paper.get("keywords", []),
        "figure_candidates": paper.get("figure_candidates", []),
        "user_goal": goal,
        "requested_figure_type": figure_type,
        "style": style,
    }
    try:
        response = post_json(
            "/v1/chat/completions",
            {
                "model": model or config.TEXT_MODEL,
                "messages": [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": json.dumps(content, ensure_ascii=False)},
                ],
                "temperature": 0.35,
                "response_format": {"type": "json_object"},
            },
        )
        text = response["choices"][0]["message"]["content"]
        parsed = json.loads(text)
        return _normalize_prompt(parsed, paper, goal, figure_type, style, "api")
    except Exception as exc:
        fallback = _fallback_prompt(paper, goal, figure_type, style)
        fallback["provider_note"] = f"Local fallback used: {exc}"
        return fallback


def improve_prompt(prompt: str, instruction: str, model: str | None = None) -> dict[str, Any]:
    if not prompt:
        prompt = "A clean scientific figure"
    try:
        response = post_json(
            "/v1/chat/completions",
            {
                "model": model or config.TEXT_MODEL,
                "messages": [
                    {"role": "system", "content": "Rewrite scientific image prompts. Return JSON with prompt and rationale."},
                    {"role": "user", "content": json.dumps({"prompt": prompt, "instruction": instruction}, ensure_ascii=False)},
                ],
                "temperature": 0.3,
                "response_format": {"type": "json_object"},
            },
        )
        return json.loads(response["choices"][0]["message"]["content"])
    except Exception:
        return {
            "prompt": f"{prompt}\n\nRevision instruction: {instruction}. Keep labels legible, composition balanced, high-resolution publication style.",
            "rationale": "Local prompt edit fallback.",
        }


def reverse_image_prompt(image_path: Path, instruction: str = "", model: str | None = None) -> dict[str, Any]:
    prompt_instruction = instruction or (
        "Reverse-engineer this scientific image into an editing-ready image generation prompt. "
        "Describe the subject, layout, panels, labels, colors, line style, background, and scientific visual constraints."
    )
    image_url = _image_data_url(image_path)
    try:
        response = post_json(
            "/v1/chat/completions",
            {
                "model": model or config.TEXT_MODEL,
                "messages": [
                    {
                        "role": "system",
                        "content": (
                            "You convert scientific figures into concise, accurate prompts for image editing. "
                            "Return strict JSON with keys: title, prompt, negative_prompt, rationale."
                        ),
                    },
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt_instruction},
                            {"type": "image_url", "image_url": {"url": image_url}},
                        ],
                    },
                ],
                "temperature": 0.25,
                "response_format": {"type": "json_object"},
            },
        )
        parsed = json.loads(response["choices"][0]["message"]["content"])
        return {
            "title": parsed.get("title") or "Reverse prompt",
            "prompt": str(parsed.get("prompt") or "").strip() or _fallback_reverse_prompt(instruction),
            "negative_prompt": parsed.get("negative_prompt") or "avoid changing scientific meaning, illegible labels, distorted axes",
            "rationale": parsed.get("rationale") or "",
            "source": "api",
        }
    except Exception as exc:
        return {
            "title": "Reverse prompt",
            "prompt": _fallback_reverse_prompt(instruction),
            "negative_prompt": "avoid changing scientific meaning, illegible labels, distorted axes",
            "rationale": "Local fallback used because the selected model could not inspect the image.",
            "provider_note": f"Local fallback used: {exc}",
            "source": "local",
        }


def _normalize_prompt(parsed: dict[str, Any], paper: dict[str, Any], goal: str, figure_type: str, style: str, source: str) -> dict[str, Any]:
    prompt = str(parsed.get("prompt") or "").strip()
    if not prompt:
        return _fallback_prompt(paper, goal, figure_type, style)
    return {
        "title": parsed.get("title") or f"{figure_type or 'Scientific'} figure",
        "prompt": prompt,
        "negative_prompt": parsed.get("negative_prompt") or "avoid decorative stock art, illegible text, hallucinated axes, crowded labels",
        "figure_type": parsed.get("figure_type") or figure_type or "scientific illustration",
        "panels": parsed.get("panels") or [],
        "labels": parsed.get("labels") or [],
        "rationale": parsed.get("rationale") or "",
        "source": source,
    }


def _fallback_prompt(paper: dict[str, Any], goal: str, figure_type: str, style: str) -> dict[str, Any]:
    title = paper.get("title") or "Research figure"
    keywords = ", ".join(paper.get("keywords", [])[:8])
    abstract = re.sub(r"\s+", " ", paper.get("abstract", ""))[:900]
    figure_type = figure_type or "multi-panel scientific schematic"
    style = style or "Nature-style clean vector-like scientific illustration"
    prompt = (
        f"Create a {figure_type} for the paper titled '{title}'. "
        f"Goal: {goal or 'summarize the central mechanism and key result'}. "
        f"Use {style}. Build a publication-ready composition with clear hierarchy, "
        f"legible labels, restrained colors, consistent line weights, and white or transparent background. "
        f"Key topics: {keywords}. Evidence summary: {abstract}. "
        "Use accurate scientific visual language, avoid ornamental decoration, and leave space for annotations."
    )
    return {
        "title": f"{figure_type.title()} draft",
        "prompt": prompt,
        "negative_prompt": "low resolution, cluttered composition, fake microscopy, unreadable labels, random icons, decorative poster style",
        "figure_type": figure_type,
        "panels": ["Context", "Method", "Main finding"],
        "labels": paper.get("keywords", [])[:6],
        "rationale": "Generated locally from extracted title, abstract, keywords, and user goal.",
        "source": "local",
    }


def _image_data_url(path: Path) -> str:
    mime_type = mimetypes.guess_type(path.name)[0] or "image/png"
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime_type};base64,{encoded}"


def _fallback_reverse_prompt(instruction: str) -> str:
    suffix = f" Editing goal: {instruction}." if instruction else ""
    return (
        "Create a clean, publication-ready scientific figure based on the input image. "
        "Preserve the original composition, panel structure, label placement, scientific symbols, "
        "color relationships, line weights, and visual hierarchy while improving clarity and legibility."
        f"{suffix}"
    )
