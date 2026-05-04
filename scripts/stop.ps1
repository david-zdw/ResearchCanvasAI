$ErrorActionPreference = "Continue"

$Root = Split-Path -Parent $PSScriptRoot
$Python = Join-Path $Root ".local-python\python\python.exe"
$Pythonw = Join-Path $Root ".local-python\python\pythonw.exe"
$PidFile = Join-Path $Root "data\server.pid"

if (-not (Test-Path $PidFile)) {
    Write-Host "No saved server PID was found."
    exit 0
}

try {
    $savedPid = [int](Get-Content -Path $PidFile -Raw)
    $process = Get-Process -Id $savedPid -ErrorAction SilentlyContinue
    $validServerPaths = @($Python, $Pythonw)
    if ($process -and $validServerPaths -contains $process.Path) {
        Stop-Process -Id $savedPid -Force
        Write-Host "Stopped Research Canvas AI server: $savedPid"
    } else {
        Write-Host "Saved PID is not the Research Canvas AI server anymore: $savedPid"
    }
} finally {
    Remove-Item -LiteralPath $PidFile -Force -ErrorAction SilentlyContinue
}
