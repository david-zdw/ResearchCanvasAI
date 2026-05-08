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
Write-Host "Note: .env, local prompt edits, logs, uploads, generated assets, and private work history were not included."
Write-Host "Built-in prompt presets are included in app\prompt_presets_seed.json."
