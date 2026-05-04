from __future__ import annotations

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from . import api, config
from .http_utils import guess_type, json_bytes, parse_multipart, parse_query, read_json


class ResearchCanvasHandler(SimpleHTTPRequestHandler):
    server_version = "ResearchCanvasAI/0.1"

    def do_GET(self) -> None:
        path, query = parse_query(self.path)
        if path == "/":
            self._send_file(config.STATIC_DIR / "index.html")
            return
        if path.startswith("/static/"):
            self._send_file(config.ROOT_DIR / path.lstrip("/"))
            return
        if path.startswith("/assets/"):
            self._send_file(config.ASSET_DIR / Path(path).name)
            return
        if path == "/api/canvas/list":
            self._send_json(api.list_canvases())
            return
        if path == "/api/canvas/latest":
            self._send_json(api.latest_canvas())
            return
        if path == "/api/prompts/presets":
            self._send_json(api.list_prompt_presets())
            return
        if path.startswith("/api/canvas/"):
            self._send_json(api.load_canvas(Path(path).name))
            return
        if path == "/api/settings":
            self._send_json(api.get_settings())
            return
        if path == "/api/models":
            self._send_json(api.list_provider_models())
            return
        self.send_error(404, "Not found")

    def do_POST(self) -> None:
        path, _query = parse_query(self.path)
        try:
            if path == "/api/papers/upload":
                _fields, files = parse_multipart(self)
                self._send_json(api.upload_paper(files))
                return
            if path == "/api/images/upload":
                _fields, files = parse_multipart(self)
                self._send_json(api.upload_image(files))
                return
            payload = read_json(self)
            routes = {
                "/api/prompts/generate": api.make_prompt,
                "/api/prompts/rewrite": api.rewrite_prompt,
                "/api/prompts/translate": api.translate_prompt_text,
                "/api/prompts/reverse": api.reverse_prompt,
                "/api/prompts/presets/save": api.save_prompt_preset,
                "/api/prompts/presets/delete": api.delete_prompt_preset,
                "/api/images/generate": api.create_image,
                "/api/images/edit": api.edit_existing_image,
                "/api/images/repaint": api.repaint_region,
                "/api/images/upscale": api.upscale_existing_image,
                "/api/images/vectorize": api.vectorize_image,
                "/api/canvas/relayout": api.relayout,
                "/api/canvas/save": api.save_canvas,
                "/api/settings": api.save_settings,
            }
            if path not in routes:
                self.send_error(404, "Not found")
                return
            self._send_json(routes[path](payload))
        except Exception as exc:
            self._send_json({"message": str(exc)}, status_code=400, status="error")

    def log_message(self, format: str, *args) -> None:
        print("%s - %s" % (self.address_string(), format % args))

    def _send_json(self, payload: dict, status_code: int = 200, status: str = "ok") -> None:
        body = json_bytes(payload, status=status)
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _send_file(self, path: Path) -> None:
        if not path.exists() or not path.is_file():
            self.send_error(404, "File not found")
            return
        body = path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", guess_type(path))
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def main() -> None:
    config.ensure_dirs()
    server = ThreadingHTTPServer((config.SERVER_HOST, config.SERVER_PORT), ResearchCanvasHandler)
    print(f"Research Canvas AI running at http://{config.SERVER_HOST}:{config.SERVER_PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down")
    finally:
        server.server_close()
