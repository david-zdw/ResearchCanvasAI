from __future__ import annotations

import json
import mimetypes
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, urlparse


@dataclass
class UploadedFile:
    field_name: str
    filename: str
    content_type: str
    data: bytes


def json_bytes(payload: Any, status: str = "ok") -> bytes:
    return json.dumps({"status": status, **payload}, ensure_ascii=False).encode("utf-8")


def read_json(handler) -> dict[str, Any]:
    length = int(handler.headers.get("Content-Length", "0") or 0)
    if length <= 0:
        return {}
    raw = handler.rfile.read(length)
    if not raw:
        return {}
    return json.loads(raw.decode("utf-8"))


def guess_type(path: Path) -> str:
    return mimetypes.guess_type(path.name)[0] or "application/octet-stream"


def parse_query(path: str) -> tuple[str, dict[str, list[str]]]:
    parsed = urlparse(path)
    return parsed.path, parse_qs(parsed.query)


def parse_multipart(handler) -> tuple[dict[str, str], list[UploadedFile]]:
    content_type = handler.headers.get("Content-Type", "")
    boundary_match = re.search(r"boundary=(.+)", content_type)
    if not boundary_match:
        raise ValueError("Missing multipart boundary")
    boundary = boundary_match.group(1).strip('"')
    length = int(handler.headers.get("Content-Length", "0") or 0)
    body = handler.rfile.read(length)
    delimiter = ("--" + boundary).encode()
    fields: dict[str, str] = {}
    files: list[UploadedFile] = []
    for part in body.split(delimiter):
        part = part.strip(b"\r\n")
        if not part or part == b"--":
            continue
        header_bytes, _, content = part.partition(b"\r\n\r\n")
        headers = header_bytes.decode("utf-8", errors="replace").split("\r\n")
        disposition = next((h for h in headers if h.lower().startswith("content-disposition:")), "")
        type_header = next((h for h in headers if h.lower().startswith("content-type:")), "")
        name = _header_param(disposition, "name") or ""
        filename = _header_param(disposition, "filename")
        content = content.rstrip(b"\r\n")
        if filename:
            files.append(
                UploadedFile(
                    field_name=name,
                    filename=Path(filename).name,
                    content_type=type_header.split(":", 1)[1].strip() if ":" in type_header else "",
                    data=content,
                )
            )
        elif name:
            fields[name] = content.decode("utf-8", errors="replace")
    return fields, files


def _header_param(header: str, name: str) -> str | None:
    match = re.search(name + r'="([^"]*)"', header)
    return match.group(1) if match else None
