from __future__ import annotations

import json
import os
import uuid
from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT_DIR / "data"
UPLOAD_DIR = DATA_DIR / "uploads"
ASSET_DIR = DATA_DIR / "assets"
STATIC_DIR = ROOT_DIR / "static"


def load_dotenv(path: Path = ROOT_DIR / ".env") -> None:
    if not path.exists():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


load_dotenv()

SERVER_HOST = os.getenv("SERVER_HOST", "127.0.0.1")
SERVER_PORT = int(os.getenv("SERVER_PORT", "8765"))
ACTIVE_PROVIDER_ID = os.getenv("ACTIVE_PROVIDER_ID", "default")
PROVIDERS: list[dict] = []
OPENAI_API_KEY = ""
OPENAI_BASE_URL = ""
TEXT_MODEL = ""
IMAGE_MODEL = ""
TEXT_MODELS = ""
IMAGE_MODELS = ""


def public_settings() -> dict:
    active_provider = active_provider_config()
    return {
        "has_api_key": bool(OPENAI_API_KEY),
        "api_key_hint": mask_key(OPENAI_API_KEY),
        "base_url": OPENAI_BASE_URL,
        "text_model": TEXT_MODEL,
        "image_model": IMAGE_MODEL,
        "text_models": parse_model_list(TEXT_MODELS, TEXT_MODEL),
        "image_models": parse_model_list(IMAGE_MODELS, IMAGE_MODEL),
        "active_provider_id": active_provider.get("id"),
        "active_provider_name": active_provider.get("name", "Default provider"),
        "providers": public_providers(),
    }


def save_runtime_settings(payload: dict) -> dict:
    global ACTIVE_PROVIDER_ID, PROVIDERS

    if "providers" in payload:
        PROVIDERS = normalize_providers(payload.get("providers", []))
        ACTIVE_PROVIDER_ID = str(payload.get("active_provider_id") or (PROVIDERS[0]["id"] if PROVIDERS else "default"))
    else:
        PROVIDERS = normalize_providers([legacy_payload_provider(payload)], keep_existing=True)
        ACTIVE_PROVIDER_ID = PROVIDERS[0]["id"]

    apply_active_provider()

    existing = _read_env_values()
    active = active_provider_config()
    existing["ACTIVE_PROVIDER_ID"] = ACTIVE_PROVIDER_ID
    existing["PROVIDERS_JSON"] = json.dumps(PROVIDERS, ensure_ascii=False, separators=(",", ":"))
    existing["OPENAI_API_KEY"] = active.get("api_key", "")
    existing["OPENAI_BASE_URL"] = OPENAI_BASE_URL
    existing["TEXT_MODEL"] = TEXT_MODEL
    existing["IMAGE_MODEL"] = IMAGE_MODEL
    existing["TEXT_MODELS"] = TEXT_MODELS
    existing["IMAGE_MODELS"] = IMAGE_MODELS
    _write_env_values(existing)
    return public_settings()


def parse_model_list(value: str, fallback: str) -> list[str]:
    models = []
    for item in str(value or "").replace("\n", ",").split(","):
        model = item.strip()
        if model and model not in models:
            models.append(model)
    if fallback and fallback not in models:
        models.insert(0, fallback)
    return models or [fallback]


def normalize_models_value(value, fallback: str) -> str:
    if isinstance(value, list):
        raw = ",".join(str(item) for item in value)
    else:
        raw = str(value or "")
    return ",".join(parse_model_list(raw, fallback))


def load_providers_from_env() -> list[dict]:
    raw = os.getenv("PROVIDERS_JSON", "").strip()
    if raw:
        try:
            providers = json.loads(raw)
            if isinstance(providers, list):
                return normalize_providers(providers, keep_existing=False)
        except json.JSONDecodeError:
            pass
    return normalize_providers([legacy_env_provider()], keep_existing=False)


def legacy_env_provider() -> dict:
    return {
        "id": ACTIVE_PROVIDER_ID or "default",
        "name": os.getenv("PROVIDER_NAME", "Default provider"),
        "api_key": os.getenv("OPENAI_API_KEY", ""),
        "base_url": os.getenv("OPENAI_BASE_URL", "https://api.openai.com").rstrip("/"),
        "text_model": os.getenv("TEXT_MODEL", "gpt-4.1-mini"),
        "image_model": os.getenv("IMAGE_MODEL", "gpt-image-2"),
        "text_models": os.getenv("TEXT_MODELS", os.getenv("TEXT_MODEL", "gpt-4.1-mini")),
        "image_models": os.getenv("IMAGE_MODELS", os.getenv("IMAGE_MODEL", "gpt-image-2")),
    }


def legacy_payload_provider(payload: dict) -> dict:
    active = active_provider_config()
    provider = {
        "id": active.get("id", "default"),
        "name": active.get("name", "Default provider"),
        "base_url": payload.get("base_url", active.get("base_url")),
        "text_model": payload.get("text_model", active.get("text_model")),
        "image_model": payload.get("image_model", active.get("image_model")),
        "text_models": payload.get("text_models", active.get("text_models")),
        "image_models": payload.get("image_models", active.get("image_models")),
    }
    if "api_key" in payload:
        provider["api_key"] = payload.get("api_key", "")
    return provider


def normalize_providers(values, keep_existing: bool = True) -> list[dict]:
    existing_by_id = {provider.get("id"): provider for provider in PROVIDERS} if keep_existing else {}
    providers: list[dict] = []
    for value in values or []:
        if not isinstance(value, dict):
            continue
        provider_id = str(value.get("id") or f"provider_{uuid.uuid4().hex[:8]}").strip()
        existing = existing_by_id.get(provider_id, {})
        text_model = str(value.get("text_model") or existing.get("text_model") or "gpt-4.1-mini").strip()
        image_model = str(value.get("image_model") or existing.get("image_model") or "gpt-image-2").strip()
        if "api_key" in value:
            api_key = str(value.get("api_key") or "").strip()
        else:
            api_key = str(existing.get("api_key") or "").strip()
        provider = {
            "id": provider_id,
            "name": str(value.get("name") or existing.get("name") or "Provider").strip(),
            "api_key": api_key,
            "base_url": str(value.get("base_url") or existing.get("base_url") or "https://api.openai.com").strip().rstrip("/"),
            "text_model": text_model,
            "image_model": image_model,
            "text_models": normalize_models_value(value.get("text_models", existing.get("text_models", text_model)), text_model),
            "image_models": normalize_models_value(value.get("image_models", existing.get("image_models", image_model)), image_model),
        }
        if provider["id"] not in [item["id"] for item in providers]:
            providers.append(provider)
    if not providers:
        providers.append(legacy_env_provider())
    return providers


def public_providers() -> list[dict]:
    return [
        {
            "id": provider["id"],
            "name": provider.get("name", "Provider"),
            "has_api_key": bool(provider.get("api_key")),
            "api_key_hint": mask_key(provider.get("api_key", "")),
            "base_url": provider.get("base_url", ""),
            "text_model": provider.get("text_model", ""),
            "image_model": provider.get("image_model", ""),
            "text_models": parse_model_list(provider.get("text_models", ""), provider.get("text_model", "")),
            "image_models": parse_model_list(provider.get("image_models", ""), provider.get("image_model", "")),
        }
        for provider in PROVIDERS
    ]


def active_provider_config() -> dict:
    for provider in PROVIDERS:
        if provider.get("id") == ACTIVE_PROVIDER_ID:
            return provider
    return PROVIDERS[0] if PROVIDERS else legacy_env_provider()


def apply_active_provider() -> None:
    global ACTIVE_PROVIDER_ID, OPENAI_API_KEY, OPENAI_BASE_URL, TEXT_MODEL, IMAGE_MODEL, TEXT_MODELS, IMAGE_MODELS

    if not PROVIDERS:
        PROVIDERS.append(legacy_env_provider())
    if not any(provider.get("id") == ACTIVE_PROVIDER_ID for provider in PROVIDERS):
        ACTIVE_PROVIDER_ID = PROVIDERS[0]["id"]
    active = active_provider_config()
    OPENAI_API_KEY = active.get("api_key", "")
    OPENAI_BASE_URL = active.get("base_url", "https://api.openai.com").rstrip("/")
    TEXT_MODEL = active.get("text_model", "gpt-4.1-mini")
    IMAGE_MODEL = active.get("image_model", "gpt-image-2")
    TEXT_MODELS = active.get("text_models", TEXT_MODEL)
    IMAGE_MODELS = active.get("image_models", IMAGE_MODEL)


def mask_key(value: str) -> str:
    if not value:
        return ""
    if len(value) <= 10:
        return "*" * len(value)
    return f"{value[:5]}...{value[-4:]}"


def _read_env_values(path: Path = ROOT_DIR / ".env") -> dict[str, str]:
    values: dict[str, str] = {}
    if not path.exists():
        return values
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, value = line.split("=", 1)
            values[key.strip()] = value.strip().strip('"').strip("'")
    return values


def _write_env_values(values: dict[str, str], path: Path = ROOT_DIR / ".env") -> None:
    ordered_keys = [
        "ACTIVE_PROVIDER_ID",
        "PROVIDERS_JSON",
        "OPENAI_API_KEY",
        "OPENAI_BASE_URL",
        "TEXT_MODEL",
        "IMAGE_MODEL",
        "TEXT_MODELS",
        "IMAGE_MODELS",
        "SERVER_HOST",
        "SERVER_PORT",
    ]
    lines = []
    for key in ordered_keys:
        if key in values:
            lines.append(f"{key}={values[key]}")
    for key, value in values.items():
        if key not in ordered_keys:
            lines.append(f"{key}={value}")
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def ensure_dirs() -> None:
    for path in (DATA_DIR, UPLOAD_DIR, ASSET_DIR):
        path.mkdir(parents=True, exist_ok=True)


PROVIDERS = load_providers_from_env()
apply_active_provider()
