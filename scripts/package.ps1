$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$DistRoot = Join-Path $Root "dist"
$AppDir = Join-Path $DistRoot "ResearchCanvasAI"
$ZipPath = Join-Path $DistRoot "ResearchCanvasAI-portable.zip"

if (Test-Path $AppDir) {
    Remove-Item -LiteralPath $AppDir -Recurse -Force
}
New-Item -ItemType Directory -Force $AppDir | Out-Null

$items = @(
    "app",
    "static",
    "scripts",
    "tools",
    ".local-python",
    "server.py",
    "README.md",
    ".env.example",
    "Start Research Canvas AI.bat",
    "Stop Research Canvas AI.bat"
)

foreach ($item in $items) {
    $source = Join-Path $Root $item
    if (-not (Test-Path $source)) {
        continue
    }
    $target = Join-Path $AppDir $item
    if ((Get-Item $source).PSIsContainer) {
        Copy-Item -LiteralPath $source -Destination $target -Recurse -Force
    } else {
        Copy-Item -LiteralPath $source -Destination $target -Force
    }
}

New-Item -ItemType Directory -Force (Join-Path $AppDir "data") | Out-Null
New-Item -ItemType Directory -Force (Join-Path $AppDir "data\assets") | Out-Null
New-Item -ItemType Directory -Force (Join-Path $AppDir "data\logs") | Out-Null
New-Item -ItemType Directory -Force (Join-Path $AppDir "data\uploads") | Out-Null

$SourceState = Join-Path $Root "data\state.json"
$TargetState = Join-Path $AppDir "data\state.json"
$Python = Join-Path $Root ".local-python\python\python.exe"
if ((Test-Path $SourceState) -and (Test-Path $Python)) {
    $script = @"
import json
import sys
from pathlib import Path

source = Path(sys.argv[1])
target = Path(sys.argv[2])
state = json.loads(source.read_text(encoding="utf-8-sig"))
clean = {
    "papers": {},
    "images": {},
    "canvases": {},
    "prompt_presets": state.get("prompt_presets", {}),
    "prompt_preset_library_seeded": state.get("prompt_preset_library_seeded", True),
}
target.write_text(json.dumps(clean, ensure_ascii=False, indent=2), encoding="utf-8")
"@
    $script | & $Python - $SourceState $TargetState
} else {
    @{
        papers = @{}
        images = @{}
        canvases = @{}
        prompt_presets = @{}
        prompt_preset_library_seeded = $false
    } | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $TargetState -Encoding UTF8
}

Get-ChildItem -LiteralPath $AppDir -Recurse -Directory -Filter "__pycache__" | Remove-Item -Recurse -Force
Get-ChildItem -LiteralPath $AppDir -Recurse -File |
    Where-Object { $_.Extension -in @(".pyc", ".pyo") } |
    Remove-Item -Force

if (Test-Path $ZipPath) {
    Remove-Item -LiteralPath $ZipPath -Force
}
Compress-Archive -LiteralPath $AppDir -DestinationPath $ZipPath -Force

Write-Host "Portable package created:"
Write-Host $AppDir
Write-Host $ZipPath
Write-Host ""
Write-Host "Note: .env, logs, uploads, generated assets, and private work history were not included."
Write-Host "Prompt presets were included in data\state.json."
