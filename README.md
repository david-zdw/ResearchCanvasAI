# Research Canvas AI

Research Canvas AI is a local-first prototype for reading papers, turning them into scientific figure prompts, generating images with an OpenAI-compatible image API, and arranging results on an infinite canvas.

The app is intentionally built with a small Python standard-library backend and a plain HTML/CSS/JS frontend so it is approachable for beginners and easy to run with `uv`.

## What is included

- Paper reading for `.pdf`, `.txt`, `.md`, and `.docx` files.
- Paper-aware prompt generation with an API-backed path and an offline fallback.
- Scientific image generation through an OpenAI-compatible `/v1/images/generations` endpoint.
- Image edit, local repaint, upscale, bitmap-to-SVG, and quick relayout API endpoints.
- Infinite canvas with pan, zoom, draggable cards, text notes, generated figures, and exportable SVG wrappers.

## One-click Start

On Windows, double-click:

```text
Start Research Canvas AI.bat
```

This starts the local server in the background and opens:

```text
http://127.0.0.1:8765
```

To stop the background server, double-click:

```text
Stop Research Canvas AI.bat
```

Logs are written to:

```text
data/logs/server.out.log
data/logs/server.err.log
```

## Portable Package

To build a portable folder and zip file, double-click:

```text
Build Portable Package.bat
```

The package is created at:

```text
dist/ResearchCanvasAI
dist/ResearchCanvasAI-portable.zip
```

For safety, `.env` and existing `data/` work history are not included in the package. This avoids accidentally sharing API keys or private projects.

## Developer Run

```powershell
& 'D:\日常工具\uv\uv-x86_64-pc-windows-msvc\uv.exe' run python server.py
```

Open:

```text
http://127.0.0.1:8765
```

## Configure APIs

Click the gear button in the top-left of the app to open the API settings panel. Settings are saved to `.env` and take effect immediately in the running server.

You can also create a `.env` file from `.env.example`, or set environment variables in PowerShell before starting:

```powershell
$env:OPENAI_API_KEY="your-key"
$env:OPENAI_BASE_URL="https://api.openai.com"
$env:TEXT_MODEL="gpt-4.1-mini"
$env:IMAGE_MODEL="gpt-image-2"
```

Notes:

- `IMAGE_MODEL` is configurable because providers may expose `gpt-image-2` through compatible APIs before or outside the official OpenAI API.
- If your OpenAI account only exposes official public image models, set `IMAGE_MODEL` to an available model such as `gpt-image-1.5` or `gpt-image-1`.
- Without an API key, paper reading and prompt generation still work with local fallbacks; image operations return transparent placeholders so the canvas flow remains testable.

## Architecture

```text
browser
  static/index.html
  static/styles.css
  static/app.js
      |
      v
Python HTTP server
  app/server.py
  app/api.py
      |
      +-- app/services/paper_reader.py
      +-- app/services/prompting.py
      +-- app/services/image_provider.py
      +-- app/services/canvas_ops.py
      +-- app/store.py
```

## Recommended next build steps

1. Add persistent project files so every canvas can be reopened.
2. Replace the lightweight PDF extraction fallback with `pypdf` or `PyMuPDF` when dependencies are available.
3. Add a real vectorization worker such as Potrace or a hosted vectorization API.
4. Add mask drawing on the canvas for production-grade local repaint.
5. Add account-level cost tracking and generation history.
