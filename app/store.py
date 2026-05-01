from __future__ import annotations

import json
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from .config import DATA_DIR


DB_PATH = DATA_DIR / "state.json"


def _empty_state() -> dict[str, Any]:
    return {"papers": {}, "images": {}, "canvases": {}, "prompt_presets": {}}


def load_state() -> dict[str, Any]:
    if not DB_PATH.exists():
        return _empty_state()
    try:
        state = json.loads(DB_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return _empty_state()
    for key, value in _empty_state().items():
        state.setdefault(key, value)
    return state


def save_state(state: dict[str, Any]) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    DB_PATH.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")


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
