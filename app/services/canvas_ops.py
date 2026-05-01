from __future__ import annotations

import base64
import shutil
import subprocess
from pathlib import Path
from typing import Any


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


def quick_relayout(items: list[dict[str, Any]], mode: str = "grid") -> list[dict[str, Any]]:
    if not items:
        return []
    updated = []
    columns = 3 if mode == "grid" else max(1, len(items))
    gap = 32
    width = 360
    height = 300
    for index, item in enumerate(items):
        clone = {**item}
        if mode == "story":
            clone["x"] = index * (width + gap)
            clone["y"] = 0 if index % 2 == 0 else 90
        else:
            clone["x"] = (index % columns) * (width + gap)
            clone["y"] = (index // columns) * (height + gap)
        updated.append(clone)
    return updated


def _xml_escape(value: str) -> str:
    return value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")
