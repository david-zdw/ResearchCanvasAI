from __future__ import annotations

import base64
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import Any, Callable

from app import config
from app.services.openai_compat import ProviderError, b64_to_bytes, download_image_url, extract_image_outputs, post_json, post_multipart
from app.services.upscayl_provider import UpscaylError, upscayl_image


PLACEHOLDER_PNG = (
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAFgwJ/l3m6GAAAAABJRU5ErkJggg=="
)

IMAGE_GENERATION_PATH = "/v1/images/generations"
IMAGE_EDIT_PATH = "/v1/images/edits"

SIZE_MAP = {
    "standard": {
        "1:1": "1024x1024",
        "2:3": "1024x1536",
        "3:2": "1536x1024",
        "3:4": "768x1024",
        "4:3": "1024x768",
        "9:16": "1008x1792",
        "16:9": "1792x1008",
    },
    "2k": {
        "1:1": "2048x2048",
        "2:3": "1344x2016",
        "3:2": "2016x1344",
        "3:4": "1536x2048",
        "4:3": "2048x1536",
        "9:16": "1152x2048",
        "16:9": "2048x1152",
    },
    "4k": {
        "1:1": "2880x2880",
        "2:3": "2336x3504",
        "3:2": "3504x2336",
        "3:4": "2448x3264",
        "4:3": "3264x2448",
        "9:16": "2160x3840",
        "16:9": "3840x2160",
    },
}


def generate_image(
    prompt: str,
    size: str = "1024x1024",
    ratio: str = "auto",
    resolution: str = "standard",
    background: str = "auto",
    quality: str = "auto",
    output_format: str = "png",
    n: int = 1,
    model: str | None = None,
) -> dict[str, Any]:
    count = _safe_image_count(n)
    model_name = model or config.IMAGE_MODEL
    requested_size = resolve_image_size(size=size, ratio=ratio, resolution=resolution, model=model_name)
    payload = {
        "model": model_name,
        "prompt": prompt,
    }
    payload.update(_image_output_options(model_name, background, quality, output_format))
    if requested_size:
        payload["size"] = requested_size
    try:
        image_payloads, errors = _run_single_image_requests(
            count,
            lambda _index: _image_payloads_from_response(_post_image_generation(payload), output_format),
        )
        if not image_payloads:
            if errors:
                raise ProviderError(errors[0])
            raise ProviderError("Image response did not include image data")
        mime_type = _mime_for_output_format(output_format)
        provider_note = _count_note(count, len(image_payloads), errors)
        return {
            "images": image_payloads,
            "image_bytes": image_payloads[0]["image_bytes"],
            "mime_type": mime_type,
            "source": "api",
            "provider_note": provider_note,
            "requested_count": count,
            "returned_count": len(image_payloads),
        }
    except Exception as exc:
        return {
            "image_bytes": base64.b64decode(PLACEHOLDER_PNG),
            "mime_type": "image/png",
            "source": "placeholder",
            "provider_note": str(exc),
        }


def _post_image_generation(payload: dict[str, Any]) -> dict[str, Any]:
    return _post_with_image_compat(
        lambda retry_payload: post_json(IMAGE_GENERATION_PATH, retry_payload),
        payload,
    )


def edit_image(
    prompt: str,
    source_path: Path | None = None,
    source_paths: list[Path] | None = None,
    mask_path: Path | None = None,
    size: str = "1024x1024",
    ratio: str = "auto",
    resolution: str = "standard",
    quality: str = "auto",
    output_format: str = "png",
    n: int = 1,
    background: str = "auto",
    model: str | None = None,
) -> dict[str, Any]:
    image_paths = source_paths or ([source_path] if source_path else [])
    if not image_paths:
        return generate_image(
            prompt,
            size=size,
            ratio=ratio,
            resolution=resolution,
            background=background,
            quality=quality,
            output_format=output_format,
            n=n,
            model=model,
        )
    count = _safe_image_count(n)
    model_name = model or config.IMAGE_MODEL
    requested_size = resolve_image_size(size=size, ratio=ratio, resolution=resolution, model=model_name)
    fields = {
        "model": model_name,
        "prompt": prompt,
    }
    fields.update(_image_output_options(model_name, background, quality, output_format))
    if requested_size:
        fields["size"] = requested_size
    files = {"image[]": image_paths} if len(image_paths) > 1 else {"image": image_paths[0]}
    if mask_path:
        files["mask"] = mask_path
    try:
        image_payloads, errors = _run_single_image_requests(
            count,
            lambda _index: _image_payloads_from_response(_post_image_edit(fields, files), output_format),
        )
        if not image_payloads:
            if errors:
                raise ProviderError(errors[0])
            raise ProviderError("Image edit response did not include image data")
        mime_type = _mime_for_output_format(output_format)
        provider_note = _count_note(count, len(image_payloads), errors)
        return {
            "images": image_payloads,
            "image_bytes": image_payloads[0]["image_bytes"],
            "mime_type": mime_type,
            "source": "api",
            "provider_note": provider_note,
            "requested_count": count,
            "returned_count": len(image_payloads),
        }
    except Exception as exc:
        return {
            "image_bytes": base64.b64decode(PLACEHOLDER_PNG),
            "mime_type": "image/png",
            "source": "placeholder",
            "provider_note": str(exc),
        }


def upscale_image(source_path: Path, scale: int = 2, model: str | None = None) -> dict[str, Any]:
    try:
        return upscayl_image(source_path, scale=scale)
    except UpscaylError as exc:
        fallback = edit_image(_upscale_prompt(scale, str(exc)), source_path=source_path, model=model)
        fallback["provider_note"] = f"{exc} Falling back to image edit upscale."
        return fallback


def _upscale_prompt(scale: int, reason: str = "") -> str:
    prefix = f"Upscale this scientific figure by {scale}x."
    if reason:
        prefix += f" Local Upscayl was unavailable: {reason}."
    return (
        f"{prefix} Preserve all labels, axes, symbols, line art, panel alignment, and transparent background "
        "where possible. Do not alter scientific meaning."
    )


def _legacy_upscale_image(source_path: Path, scale: int = 2, model: str | None = None) -> dict[str, Any]:
    prompt = (
        f"Upscale this scientific figure by {scale}x. Preserve all labels, axes, symbols, line art, "
        "panel alignment, and transparent background where possible."
    )
    return edit_image(prompt, source_path=source_path, model=model)


def _post_image_edit(fields: dict[str, Any], files: dict[str, Path | list[Path]]) -> dict[str, Any]:
    return _post_with_image_compat(
        lambda retry_fields: post_multipart(IMAGE_EDIT_PATH, retry_fields, files),
        fields,
    )


def _post_with_image_compat(send: Callable[[dict[str, Any]], dict[str, Any]], payload: dict[str, Any]) -> dict[str, Any]:
    last_error: ProviderError | None = None
    for retry_payload in _image_payload_variants(payload):
        try:
            result = send(retry_payload)
            _raise_embedded_provider_error(result)
            if isinstance(result, dict):
                result["_request_payload"] = retry_payload
            return result
        except ProviderError as exc:
            last_error = exc
            if not _should_retry_compatible_payload(exc):
                raise
    if last_error:
        raise last_error
    raise ProviderError("Image provider request failed")


def _image_payload_variants(payload: dict[str, Any]) -> list[dict[str, Any]]:
    variants: list[dict[str, Any]] = []

    def add(candidate: dict[str, Any]) -> None:
        cleaned = {key: value for key, value in candidate.items() if value not in (None, "")}
        if cleaned not in variants:
            variants.append(cleaned)

    add(dict(payload))

    without_background = {key: value for key, value in payload.items() if key != "background"}
    add(without_background)

    without_response_format = {key: value for key, value in payload.items() if key != "response_format"}
    add(without_response_format)

    without_auto_defaults = {
        key: value
        for key, value in payload.items()
        if not (
            key in {"background", "quality"}
            and str(value).lower() == "auto"
        )
    }
    add(without_auto_defaults)

    minimal = {
        key: value
        for key, value in payload.items()
        if key in {"model", "prompt", "size"}
    }
    add(minimal)

    add({key: value for key, value in payload.items() if key in {"model", "prompt"}})

    return variants


def _image_output_options(model_name: str, background: str, quality: str, output_format: str) -> dict[str, Any]:
    """Return Images API options that are safe for GPT image models and compatible proxies."""
    options: dict[str, Any] = {}
    model_key = str(model_name or "").lower()
    normalized_background = str(background or "auto").lower()
    normalized_quality = str(quality or "auto").lower()
    normalized_format = str(output_format or "png").lower()

    # Official GPT image models always return b64_json, so response_format must
    # not be sent. DALL-E models still benefit from requesting base64 directly.
    if not _is_gpt_image_model(model_key):
        options["response_format"] = "b64_json"

    if normalized_quality and normalized_quality != "auto":
        options["quality"] = normalized_quality

    if normalized_format and normalized_format != "png":
        options["output_format"] = "jpeg" if normalized_format == "jpg" else normalized_format

    if normalized_background and normalized_background != "auto":
        # Transparent output is a common source of 400s for gpt-image-2 and for
        # compatible providers. Only pass it when the format can carry alpha and
        # let the prompt describe transparency otherwise.
        supports_alpha = normalized_format in {"png", "webp"}
        if normalized_background != "transparent" or (supports_alpha and not _is_gpt_image_2_model(model_key)):
            options["background"] = normalized_background

    return options


def _is_gpt_image_model(model_key: str) -> bool:
    return model_key.startswith("gpt-image") or model_key.startswith("chatgpt-image")


def _is_gpt_image_2_model(model_key: str) -> bool:
    return model_key.startswith("gpt-image-2") or model_key.startswith("chatgpt-image-2")


def _raise_embedded_provider_error(result: dict[str, Any]) -> None:
    message = _embedded_provider_error_message(result)
    if message:
        raise ProviderError(message)


def _embedded_provider_error_message(result: dict[str, Any]) -> str:
    if not isinstance(result, dict):
        return ""
    error = result.get("error")
    if isinstance(error, dict):
        return str(error.get("message") or error.get("code") or error).strip()
    if isinstance(error, str):
        return error.strip()
    if str(result.get("status", "")).lower() == "error":
        return str(result.get("message") or result).strip()
    return ""


def _should_retry_compatible_payload(exc: ProviderError) -> bool:
    message = str(exc).lower()
    retry_markers = (
        "transparent background is not supported",
        "unsupported parameter",
        "unsupported field",
        "unrecognized request argument",
        "unknown parameter",
        "invalid parameter",
        "invalid value",
        "extra inputs are not permitted",
    )
    return any(marker in message for marker in retry_markers)


def _should_try_next_image_endpoint(exc: ProviderError) -> bool:
    message = str(exc).lower()
    endpoint_markers = (
        "404",
        "not found",
        "no route",
        "cannot post",
        "unsupported endpoint",
        "invalid endpoint",
        "method not allowed",
    )
    return any(marker in message for marker in endpoint_markers)


def resolve_image_size(
    size: str = "1024x1024",
    ratio: str = "auto",
    resolution: str = "standard",
    model: str | None = None,
) -> str | None:
    ratio = str(ratio or "auto").lower()
    resolution = str(resolution or "standard").lower()
    if ratio != "auto" and resolution != "auto":
        mapped = SIZE_MAP.get(resolution, {}).get(ratio)
        if mapped:
            return mapped
    if not size or str(size).lower() == "auto":
        return None
    return str(size)


def _run_single_image_requests(count: int, make_request) -> tuple[list[dict[str, Any]], list[str]]:
    results: list[tuple[int, dict[str, Any]]] = []
    errors: list[str] = []
    with ThreadPoolExecutor(max_workers=min(count, 4)) as executor:
        futures = {executor.submit(make_request, index): index for index in range(count)}
        for future in as_completed(futures):
            index = futures[future]
            try:
                future_payloads = future.result()
            except Exception as exc:
                errors.append(str(exc))
                continue
            for image_payload in future_payloads:
                results.append((index, image_payload))
                break
    results.sort(key=lambda item: item[0])
    return [image_payload for _index, image_payload in results], errors


def _safe_image_count(value: int) -> int:
    try:
        count = int(value)
    except (TypeError, ValueError):
        count = 1
    return max(1, min(count, 4))


def _count_note(requested: int, returned: int, errors: list[str] | None = None) -> str:
    errors = errors or []
    if requested == returned and not errors:
        return ""
    message = f"Requested {requested} image(s), provider response contained {returned} parsable image(s)."
    if errors:
        message += f" {len(errors)} request(s) failed: {errors[0]}"
    return message


def _image_payloads_from_response(response: dict[str, Any], output_format: str) -> list[dict[str, Any]]:
    response_format = response.get("output_format")
    request_payload = response.get("_request_payload") if isinstance(response.get("_request_payload"), dict) else {}
    fallback_format = response_format or request_payload.get("output_format") or "png"
    fallback_mime = _mime_for_output_format(fallback_format or output_format)
    payloads = []
    for image in extract_image_outputs(response):
        if image["kind"] == "b64":
            payloads.append({"image_bytes": b64_to_bytes(image["value"]), "mime_type": fallback_mime})
        elif image["kind"] == "url":
            image_bytes, mime_type = download_image_url(image["value"])
            payloads.append({"image_bytes": image_bytes, "mime_type": mime_type or fallback_mime})
    return payloads


def _mime_for_output_format(value: str) -> str:
    formats = {
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "png": "image/png",
        "webp": "image/webp",
    }
    return formats.get(str(value or "").lower(), "image/png")
