from __future__ import annotations

import json
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from .config import DATA_DIR


DB_PATH = DATA_DIR / "state.json"
PROMPT_PRESETS_PATH = DATA_DIR / "prompt_presets.json"
PRIVATE_STATE_KEYS = ("papers", "images", "canvases")


def _empty_state() -> dict[str, Any]:
    return {"papers": {}, "images": {}, "canvases": {}}


def load_state() -> dict[str, Any]:
    if not DB_PATH.exists():
        return _empty_state()
    try:
        raw_state = json.loads(DB_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return _empty_state()
    if not isinstance(raw_state, dict):
        return _empty_state()
    _migrate_legacy_prompt_presets(raw_state)
    state = _empty_state()
    for key in PRIVATE_STATE_KEYS:
        value = raw_state.get(key)
        if isinstance(value, dict):
            state[key] = value
    return state


def save_state(state: dict[str, Any]) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    private_state = _empty_state()
    for key in PRIVATE_STATE_KEYS:
        value = state.get(key)
        if isinstance(value, dict):
            private_state[key] = value
    _write_json(DB_PATH, private_state)


def load_saved_prompt_presets() -> dict[str, Any]:
    legacy = _read_legacy_prompt_presets()
    saved = _read_prompt_presets_file()
    if legacy:
        merged = {**legacy, **saved}
        save_saved_prompt_presets(merged)
        _remove_legacy_prompt_presets()
        return merged
    return saved


def save_saved_prompt_presets(presets: dict[str, Any]) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    clean = {str(key): value for key, value in presets.items() if isinstance(value, dict)}
    _write_json(PROMPT_PRESETS_PATH, {"prompt_presets": clean})


def _read_prompt_presets_file() -> dict[str, Any]:
    if not PROMPT_PRESETS_PATH.exists():
        return {}
    try:
        payload = json.loads(PROMPT_PRESETS_PATH.read_text(encoding="utf-8-sig"))
    except (json.JSONDecodeError, OSError):
        return {}
    return _normalize_prompt_preset_collection(payload)


def _read_legacy_prompt_presets() -> dict[str, Any]:
    if not DB_PATH.exists():
        return {}
    try:
        raw_state = json.loads(DB_PATH.read_text(encoding="utf-8-sig"))
    except (json.JSONDecodeError, OSError):
        return {}
    if not isinstance(raw_state, dict):
        return {}
    return _normalize_prompt_preset_collection(raw_state.get("prompt_presets", {}))


def _migrate_legacy_prompt_presets(raw_state: dict[str, Any]) -> None:
    legacy = _normalize_prompt_preset_collection(raw_state.get("prompt_presets", {}))
    if not legacy:
        raw_state.pop("prompt_presets", None)
        raw_state.pop("prompt_preset_library_seeded", None)
        return
    saved = _read_prompt_presets_file()
    save_saved_prompt_presets({**legacy, **saved})
    raw_state.pop("prompt_presets", None)
    raw_state.pop("prompt_preset_library_seeded", None)
    _write_json(DB_PATH, {key: raw_state.get(key, {}) for key in PRIVATE_STATE_KEYS})


def _remove_legacy_prompt_presets() -> None:
    if not DB_PATH.exists():
        return
    try:
        raw_state = json.loads(DB_PATH.read_text(encoding="utf-8-sig"))
    except (json.JSONDecodeError, OSError):
        return
    if not isinstance(raw_state, dict):
        return
    raw_state.pop("prompt_presets", None)
    raw_state.pop("prompt_preset_library_seeded", None)
    _write_json(DB_PATH, {key: raw_state.get(key, {}) for key in PRIVATE_STATE_KEYS})


def _normalize_prompt_preset_collection(payload: Any) -> dict[str, Any]:
    if isinstance(payload, dict) and isinstance(payload.get("prompt_presets"), (dict, list)):
        payload = payload["prompt_presets"]
    if isinstance(payload, dict):
        values = payload.values()
    elif isinstance(payload, list):
        values = payload
    else:
        values = []
    presets: dict[str, Any] = {}
    for item in values:
        if isinstance(item, dict) and item.get("id"):
            presets[str(item["id"])] = item
    return presets


def _write_json(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")


def new_id(prefix: str) -> str:
    return f"{prefix}_{uuid.uuid4().hex[:12]}"


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def upsert(collection: str, item: dict[str, Any]) -> dict[str, Any]:
    state = load_state()
    state.setdefault(collection, {})
    state[collection][item["id"]] = item
    save_state(state)
    return item


def get(collection: str, item_id: str) -> dict[str, Any] | None:
    return load_state().get(collection, {}).get(item_id)
