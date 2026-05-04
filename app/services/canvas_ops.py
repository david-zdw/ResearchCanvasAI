from __future__ import annotations

import base64
import shutil
import subprocess
from pathlib import Path
from typing import Any


WORKFLOW_TEXT_NODE_WIDTH = 430
WORKFLOW_TEXT_NODE_KINDS = {"prompt", "prompt-translate", "text-to-image", "image-to-image", "reverse-prompt"}


class VectorizeError(RuntimeError):
    pass


def vectorize_bitmap_to_svg_file(image_path: Path, output_path: Path, title: str = "Vectorized figure") -> str:
    method = _vectorize_with_python(image_path, output_path) or _vectorize_with_cli(image_path, output_path)
    if not method:
        output_path.write_text(bitmap_to_svg(image_path, title), encoding="utf-8")
        return "embedded-raster-fallback"
    return method


def bitmap_to_svg(image_path: Path, title: str = "Vectorized figure") -> str:
    mime = "image/png"
    b64 = base64.b64encode(image_path.read_bytes()).decode("ascii")
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024" role="img" aria-label="{_xml_escape(title)}">
  <title>{_xml_escape(title)}</title>
  <rect width="1024" height="1024" fill="white"/>
  <image href="data:{mime};base64,{b64}" x="0" y="0" width="1024" height="1024" preserveAspectRatio="xMidYMid meet"/>
</svg>
"""


def _vectorize_with_python(image_path: Path, output_path: Path) -> str | None:
    try:
        import vtracer
    except ImportError:
        return None
    try:
        vtracer.convert_image_to_svg_py(
            str(image_path),
            str(output_path),
            colormode="color",
            hierarchical="stacked",
            mode="spline",
            filter_speckle=4,
            color_precision=6,
            layer_difference=16,
            corner_threshold=60,
            length_threshold=4.0,
            max_iterations=10,
            splice_threshold=45,
            path_precision=3,
        )
    except Exception as exc:
        raise VectorizeError(f"VTracer Python vectorization failed: {exc}") from exc
    return "vtracer-python"


def _vectorize_with_cli(image_path: Path, output_path: Path) -> str | None:
    executable = shutil.which("vtracer")
    if not executable:
        return None
    command = [
        executable,
        "--input",
        str(image_path),
        "--output",
        str(output_path),
        "--colormode",
        "color",
        "--hierarchical",
        "stacked",
        "--mode",
        "spline",
        "--filter_speckle",
        "4",
        "--color_precision",
        "6",
        "--gradient_step",
        "16",
        "--corner_threshold",
        "60",
        "--segment_length",
        "4.0",
        "--splice_threshold",
        "45",
        "--path_precision",
        "3",
    ]
    try:
        subprocess.run(command, check=True, capture_output=True, text=True, timeout=600)
    except Exception as exc:
        raise VectorizeError(f"VTracer CLI vectorization failed: {exc}") from exc
    return "vtracer-cli"


def quick_relayout(
    items: list[dict[str, Any]],
    mode: str = "grid",
    links: list[dict[str, Any]] | None = None,
) -> list[dict[str, Any]]:
    if not items:
        return []
    if links:
        return _relayout_by_links(items, links)
    updated = []
    columns = 3 if mode == "grid" else max(1, len(items))
    gap = 96
    width = 460
    cursor_y = 0
    row_height = 0
    for index, item in enumerate(items):
        clone = {**item}
        clone["width"] = _node_width(clone)
        if mode == "story":
            clone["x"] = index * (width + gap)
            clone["y"] = 0 if index % 2 == 0 else 90
        else:
            column = index % columns
            if column == 0 and index:
                cursor_y += row_height + gap
                row_height = 0
            clone["x"] = column * (width + gap)
            clone["y"] = cursor_y
            row_height = max(row_height, _node_height(clone))
        updated.append(clone)
    return updated


def _relayout_by_links(items: list[dict[str, Any]], links: list[dict[str, Any]]) -> list[dict[str, Any]]:
    item_by_id = {str(item.get("id")): item for item in items if item.get("id")}
    valid_links = [
        (str(link.get("from")), str(link.get("to")))
        for link in links
        if str(link.get("from")) in item_by_id and str(link.get("to")) in item_by_id
    ]
    if not valid_links:
        return quick_relayout(items, "grid", None)

    incoming = {item_id: set() for item_id in item_by_id}
    outgoing = {item_id: set() for item_id in item_by_id}
    for from_id, to_id in valid_links:
        outgoing[from_id].add(to_id)
        incoming[to_id].add(from_id)

    layer_by_id = _node_layers(list(item_by_id), incoming, outgoing)
    layers: dict[int, list[str]] = {}
    original_index = {str(item.get("id")): index for index, item in enumerate(items)}
    for item_id, layer in layer_by_id.items():
        layers.setdefault(layer, []).append(item_id)
    for layer_items in layers.values():
        layer_items.sort(
            key=lambda item_id: (
                min((original_index.get(parent, 0) for parent in incoming[item_id]), default=original_index[item_id]),
                original_index[item_id],
            )
        )

    column_gap = 180
    row_gap = 128
    min_x = min((float(item.get("x", 0) or 0) for item in items), default=0)
    min_y = min((float(item.get("y", 0) or 0) for item in items), default=0)
    column_widths = {
        layer: max(_node_width(item_by_id[item_id]) for item_id in layer_items)
        for layer, layer_items in layers.items()
    }
    column_x: dict[int, int] = {}
    cursor_x = int(min_x)
    for layer in sorted(layers):
        column_x[layer] = cursor_x
        cursor_x += column_widths[layer] + column_gap

    updated_by_id: dict[str, dict[str, Any]] = {}
    placed_tops: dict[str, int] = {}
    for layer in sorted(layers):
        cursor_y = int(min_y)
        ordered_items = sorted(
            layers[layer],
            key=lambda item_id: (
                _desired_node_top(item_id, item_by_id, incoming, placed_tops, min_y),
                original_index[item_id],
            ),
        )
        for item_id in ordered_items:
            item = item_by_id[item_id]
            desired_y = _desired_node_top(item_id, item_by_id, incoming, placed_tops, min_y)
            top = max(cursor_y, int(round(desired_y)))
            clone = {**item}
            clone["x"] = column_x[layer]
            clone["y"] = top
            clone["width"] = _node_width(item)
            updated_by_id[item_id] = clone
            placed_tops[item_id] = top
            cursor_y = top + _node_height(item) + row_gap

    return [updated_by_id.get(str(item.get("id")), {**item}) for item in items]


def _node_layers(
    item_ids: list[str],
    incoming: dict[str, set[str]],
    outgoing: dict[str, set[str]],
) -> dict[str, int]:
    layer_by_id = {item_id: 0 for item_id in item_ids}
    queue = [item_id for item_id in item_ids if not incoming[item_id]]
    if not queue:
        queue = item_ids[:]
    seen_count = 0
    while queue and seen_count < len(item_ids) * max(1, len(item_ids)):
        current = queue.pop(0)
        seen_count += 1
        for child in outgoing[current]:
            next_layer = layer_by_id[current] + 1
            if next_layer > layer_by_id[child]:
                layer_by_id[child] = next_layer
                queue.append(child)
    return layer_by_id


def _node_width(item: dict[str, Any]) -> int:
    node_kind = str(item.get("nodeKind") or item.get("type") or "")
    if node_kind in WORKFLOW_TEXT_NODE_KINDS:
        return WORKFLOW_TEXT_NODE_WIDTH
    try:
        return max(320, int(float(item.get("width") or 360)))
    except (TypeError, ValueError):
        return 360


def _node_height(item: dict[str, Any]) -> int:
    estimated = _estimated_node_height(item)
    explicit = item.get("height")
    if explicit:
        try:
            return max(estimated, int(float(explicit)))
        except (TypeError, ValueError):
            pass
    return estimated


def _estimated_node_height(item: dict[str, Any]) -> int:
    node_kind = str(item.get("nodeKind") or item.get("type") or "")
    item_type = str(item.get("type") or "")
    if item_type in {"image", "svg"} or node_kind in {"generated-image", "uploaded-image", "image-edit", "upscale", "vector", "region-crop"}:
        return 500
    if node_kind == "text-to-image":
        return 530
    if node_kind == "image-to-image":
        return 570
    if node_kind == "reverse-prompt":
        return 360
    if node_kind == "prompt-translate":
        return 420
    if node_kind == "prompt":
        return 280
    text_length = len(str(item.get("text") or item.get("prompt") or ""))
    return min(560, 240 + text_length // 4)


def _desired_node_top(
    item_id: str,
    item_by_id: dict[str, dict[str, Any]],
    incoming: dict[str, set[str]],
    placed_tops: dict[str, int],
    min_y: float,
) -> float:
    parent_centers = [
        placed_tops[parent_id] + _node_height(item_by_id[parent_id]) / 2
        for parent_id in incoming[item_id]
        if parent_id in placed_tops
    ]
    if not parent_centers:
        return min_y
    center = sum(parent_centers) / len(parent_centers)
    return max(min_y, center - _node_height(item_by_id[item_id]) / 2)


def _xml_escape(value: str) -> str:
    return value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")
