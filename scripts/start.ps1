$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$Python = Join-Path $Root ".local-python\python\python.exe"
$LogDir = Join-Path $Root "data\logs"
$LogFile = Join-Path $LogDir "server.log"

New-Item -ItemType Directory -Force $LogDir | Out-Null

if (-not (Test-Path $Python)) {
    Write-Host "Local Python was not found. Extract it from D:\日常工具\uv\python_pkgs first." -ForegroundColor Red
    exit 1
}

$env:PYTHONUNBUFFERED = "1"
Set-Location $Root

Write-Host "Starting Research Canvas AI at http://127.0.0.1:8765"
Write-Host "Log: $LogFile"

& $Python "server.py" *> $LogFile
