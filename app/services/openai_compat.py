from __future__ import annotations

import base64
from datetime import datetime, timezone
import json
import mimetypes
import socket
import uuid
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

from app import config


class ProviderError(RuntimeError):
    pass


def has_api_key() -> bool:
    return bool(config.OPENAI_API_KEY)


def get_json(path: str) -> dict[str, Any]:
    if not config.OPENAI_API_KEY:
        raise ProviderError("OPENAI_API_KEY is not configured")
    request = urllib.request.Request(
        join_api_url(config.OPENAI_BASE_URL, path),
        headers={"Authorization": f"Bearer {config.OPENAI_API_KEY}"},
        method="GET",
    )
    try:
        with urllib.request.urlopen(request, timeout=120) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise ProviderError(f"{exc.code} {detail}") from exc
    except urllib.error.URLError as exc:
        raise ProviderError(str(exc.reason)) from exc
    except TimeoutError as exc:
        raise ProviderError("Provider request timed out while listing models") from exc


def post_json(path: str, payload: dict[str, Any]) -> dict[str, Any]:
    if not config.OPENAI_API_KEY:
        raise ProviderError("OPENAI_API_KEY is not configured")
    url = join_api_url(config.OPENAI_BASE_URL, path)
    _log_provider_event("request", path=path, payload=payload)
    request = urllib.request.Request(
        url,
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {config.OPENAI_API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=600) as response:
            result = json.loads(response.read().decode("utf-8"))
            _log_provider_event("response", path=path, response=result)
            return result
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        _log_provider_event("http_error", path=path, status=exc.code, detail=detail, payload=payload)
        raise ProviderError(f"{exc.code} {detail}") from exc
    except urllib.error.URLError as exc:
        _log_provider_event("url_error", path=path, detail=str(exc.reason), payload=payload)
        raise ProviderError(str(exc.reason)) from exc
    except (TimeoutError, socket.timeout) as exc:
        _log_provider_event("timeout", path=path, payload=payload)
        raise ProviderError("Provider image/text request timed out. The model may still be processing; try a smaller image size or retry later.") from exc


def post_multipart(path: str, fields: dict[str, str], files: dict[str, Path | list[Path]]) -> dict[str, Any]:
    if not config.OPENAI_API_KEY:
        raise ProviderError("OPENAI_API_KEY is not configured")
    _log_provider_event("request", path=path, payload=fields, files=_file_summary(files))
    boundary = f"----research-canvas-{uuid.uuid4().hex}"
    body = bytearray()
    for name, value in fields.items():
        if value is None or value == "":
            continue
        body.extend(f"--{boundary}\r\n".encode("utf-8"))
        body.extend(f'Content-Disposition: form-data; name="{name}"\r\n\r\n'.encode("utf-8"))
        body.extend(str(value).encode("utf-8"))
        body.extend(b"\r\n")
    for name, path_value in _iter_file_parts(files):
        content_type = mimetypes.guess_type(path_value.name)[0] or "application/octet-stream"
        body.extend(f"--{boundary}\r\n".encode("utf-8"))
        body.extend(
            f'Content-Disposition: form-data; name="{name}"; filename="{path_value.name}"\r\n'.encode("utf-8")
        )
        body.extend(f"Content-Type: {content_type}\r\n\r\n".encode("utf-8"))
        body.extend(path_value.read_bytes())
        body.extend(b"\r\n")
    body.extend(f"--{boundary}--\r\n".encode("utf-8"))

    request = urllib.request.Request(
        join_api_url(config.OPENAI_BASE_URL, path),
        data=bytes(body),
        headers={
            "Authorization": f"Bearer {config.OPENAI_API_KEY}",
            "Content-Type": f"multipart/form-data; boundary={boundary}",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=600) as response:
            result = json.loads(response.read().decode("utf-8"))
            _log_provider_event("response", path=path, response=result)
            return result
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        _log_provider_event("http_error", path=path, status=exc.code, detail=detail, payload=fields, files=_file_summary(files))
        raise ProviderError(f"{exc.code} {detail}") from exc
    except urllib.error.URLError as exc:
        _log_provider_event("url_error", path=path, detail=str(exc.reason), payload=fields, files=_file_summary(files))
        raise ProviderError(str(exc.reason)) from exc
    except (TimeoutError, socket.timeout) as exc:
        _log_provider_event("timeout", path=path, payload=fields, files=_file_summary(files))
        raise ProviderError("Provider image edit request timed out. Try a smaller image or retry later.") from exc


def _iter_file_parts(files: dict[str, Path | list[Path]]):
    for name, value in files.items():
        paths = value if isinstance(value, list) else [value]
        for path_value in paths:
            yield name, path_value


def _log_provider_event(event: str, **values: Any) -> None:
    try:
        log_dir = config.DATA_DIR / "logs"
        log_dir.mkdir(parents=True, exist_ok=True)
        record = {
            "time": datetime.now(timezone.utc).isoformat(),
            "event": event,
            **_sanitize_log_values(values),
        }
        with (log_dir / "provider-debug.log").open("a", encoding="utf-8") as handle:
            handle.write(json.dumps(record, ensure_ascii=False, separators=(",", ":")) + "\n")
    except Exception:
        pass


def _sanitize_log_values(values: dict[str, Any]) -> dict[str, Any]:
    sanitized: dict[str, Any] = {}
    for key, value in values.items():
        if key == "payload" and isinstance(value, dict):
            sanitized[key] = _payload_summary(value)
        elif key == "response":
            sanitized[key] = _response_summary(value)
        elif key == "detail":
            sanitized[key] = str(value)[:1200]
        else:
            sanitized[key] = value
    return sanitized


def _payload_summary(payload: dict[str, Any]) -> dict[str, Any]:
    allowed = {"model", "size", "quality", "output_format", "background", "n", "response_format"}
    summary = {key: payload.get(key) for key in allowed if key in payload}
    if "prompt" in payload:
        summary["prompt_chars"] = len(str(payload.get("prompt") or ""))
    return summary


def _response_summary(response: Any) -> dict[str, Any]:
    if not isinstance(response, dict):
        return {"type": type(response).__name__}
    return {
        "keys": sorted(str(key) for key in response.keys()),
        "image_outputs": len(extract_image_outputs(response)),
        "error": response.get("error"),
        "status": response.get("status"),
        "message": response.get("message"),
    }


def _file_summary(files: dict[str, Path | list[Path]]) -> dict[str, Any]:
    summary: dict[str, Any] = {}
    for name, value in files.items():
        paths = value if isinstance(value, list) else [value]
        summary[name] = [{"name": path.name, "bytes": path.stat().st_size if path.exists() else 0} for path in paths]
    return summary


def extract_b64_image(response: dict[str, Any]) -> str | None:
    images = [item["value"] for item in extract_image_outputs(response) if item["kind"] == "b64"]
    return images[0] if images else None


def extract_b64_images(response: dict[str, Any]) -> list[str]:
    return [item["value"] for item in extract_image_outputs(response) if item["kind"] == "b64"]


def extract_image_outputs(response: dict[str, Any]) -> list[dict[str, str]]:
    images: list[dict[str, str]] = []
    seen: set[tuple[str, str]] = set()
    _collect_image_outputs(response, images, seen)
    return images


def download_image_url(url: str) -> tuple[bytes, str]:
    if url.startswith("data:"):
        header, value = url.split(",", 1)
        mime_type = header[5:].split(";", 1)[0] or "image/png"
        return base64.b64decode(value), mime_type
    request = urllib.request.Request(url, headers={"User-Agent": "ResearchCanvasAI/0.1"})
    with urllib.request.urlopen(request, timeout=600) as response:
        mime_type = response.headers.get_content_type() or "image/png"
        return response.read(), mime_type


def _collect_image_outputs(value: Any, images: list[dict[str, str]], seen: set[tuple[str, str]]) -> None:
    if isinstance(value, dict):
        for key in ("b64_json", "image_base64"):
            _append_image_value("b64", value.get(key), images, seen)
        for key in ("url", "image_url"):
            _append_image_value("url", value.get(key), images, seen)
        for key, child in value.items():
            if key not in {"b64_json", "image_base64"}:
                _collect_image_outputs(child, images, seen)
    elif isinstance(value, list):
        for item in value:
            _collect_image_outputs(item, images, seen)


def _append_image_value(kind: str, value: Any, images: list[dict[str, str]], seen: set[tuple[str, str]]) -> None:
    if isinstance(value, str) and _looks_like_image_value(kind, value):
        key = (kind, value)
        if key not in seen:
            seen.add(key)
            images.append({"kind": kind, "value": value})
    elif isinstance(value, list):
        for item in value:
            _append_image_value(kind, item, images, seen)


def _looks_like_image_value(kind: str, value: str) -> bool:
    if kind == "url":
        return value.startswith("http://") or value.startswith("https://") or value.startswith("data:image/")
    return bool(value)


def b64_to_bytes(value: str) -> bytes:
    if value.startswith("data:"):
        value = value.split(",", 1)[1]
    return base64.b64decode(value)


def join_api_url(base_url: str, path: str) -> str:
    base = base_url.rstrip("/")
    endpoint = path if path.startswith("/") else f"/{path}"
    if base.endswith("/v1") and endpoint.startswith("/v1/"):
        endpoint = endpoint[3:]
    return base + endpoint
