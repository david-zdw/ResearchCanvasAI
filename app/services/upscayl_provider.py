from __future__ import annotations

import os
import shutil
import subprocess
import tempfile
from pathlib import Path
from typing import Any

from app import config


class UpscaylError(RuntimeError):
    pass


def upscayl_image(source_path: Path, scale: int = 4) -> dict[str, Any]:
    executable = find_upscayl_executable()
    if not executable:
        raise UpscaylError(
            "Upscayl backend was not found. Install Upscayl or set UPSCAYL_BIN to upscayl-bin.exe."
        )

    safe_scale = _safe_scale(scale)
    with tempfile.TemporaryDirectory(dir=config.DATA_DIR) as temp_dir:
        output_path = Path(temp_dir) / "upscaled.png"
        command = [
            str(executable),
            "-i",
            str(source_path),
            "-o",
            str(output_path),
            "-s",
            str(safe_scale),
            "-f",
            "png",
        ]
        model_dir = _models_dir(executable)
        if model_dir:
            command.extend(["-m", str(model_dir)])
        model_name = os.getenv("UPSCAYL_MODEL", "").strip() or _default_model_name(model_dir)
        if model_name:
            command.extend(["-n", model_name])

        try:
            completed = subprocess.run(
                command,
                cwd=str(executable.parent),
                check=True,
                capture_output=True,
                text=True,
                timeout=1800,
            )
        except subprocess.CalledProcessError as exc:
            detail = (exc.stderr or exc.stdout or str(exc)).strip()
            raise UpscaylError(f"Upscayl failed: {detail}") from exc
        except subprocess.TimeoutExpired as exc:
            raise UpscaylError("Upscayl timed out while processing this image.") from exc

        if not output_path.exists():
            detail = (completed.stderr or completed.stdout or "").strip()
            raise UpscaylError(f"Upscayl did not create an output image. {detail}".strip())

        return {
            "image_bytes": output_path.read_bytes(),
            "mime_type": "image/png",
            "source": "upscayl",
            "provider_note": f"Upscaled locally with Upscayl x{safe_scale}.",
        }


def find_upscayl_executable() -> Path | None:
    env_path = os.getenv("UPSCAYL_BIN", "").strip()
    candidates = []
    if env_path:
        candidates.append(Path(env_path))
    command_path = shutil.which("upscayl-bin") or shutil.which("upscayl-bin.exe")
    if command_path:
        candidates.append(Path(command_path))
    candidates.extend(_common_windows_paths())
    candidates.extend(
        [
            config.ROOT_DIR / "tools" / "upscayl" / "upscayl-bin.exe",
            config.ROOT_DIR / "tools" / "upscayl" / "upscayl-bin",
        ]
    )
    for candidate in candidates:
        if candidate.exists() and candidate.is_file():
            return candidate
    bundled_root = config.ROOT_DIR / "tools" / "upscayl"
    if bundled_root.exists():
        matches = sorted(bundled_root.rglob("upscayl-bin.exe"))
        if matches:
            return matches[0]
    return None


def _common_windows_paths() -> list[Path]:
    paths = []
    for root in (os.getenv("ProgramFiles"), os.getenv("ProgramFiles(x86)"), os.getenv("LOCALAPPDATA")):
        if not root:
            continue
        base = Path(root)
        paths.extend(
            [
                base / "Upscayl" / "resources" / "bin" / "upscayl-bin.exe",
                base / "Programs" / "Upscayl" / "resources" / "bin" / "upscayl-bin.exe",
            ]
        )
    return paths


def _models_dir(executable: Path) -> Path | None:
    env_path = os.getenv("UPSCAYL_MODELS_DIR", "").strip()
    candidates = []
    if env_path:
        candidates.append(Path(env_path))
    candidates.extend([executable.parent / "models", executable.parent.parent / "models"])
    for candidate in candidates:
        if candidate.exists() and candidate.is_dir():
            return candidate
    return None


def _default_model_name(model_dir: Path | None) -> str:
    if not model_dir:
        return ""
    preferred = model_dir / "RealESRGAN_General_x4_v3.param"
    if preferred.exists():
        return "RealESRGAN_General_x4_v3"
    params = sorted(model_dir.glob("*.param"))
    return params[0].stem if params else ""


def _safe_scale(value: int) -> int:
    try:
        scale = int(value)
    except (TypeError, ValueError):
        scale = 4
    return max(2, min(scale, 4))
