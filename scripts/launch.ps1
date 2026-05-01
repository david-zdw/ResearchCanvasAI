$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$Python = Join-Path $Root ".local-python\python\python.exe"
$DataDir = Join-Path $Root "data"
$LogDir = Join-Path $DataDir "logs"
$PidFile = Join-Path $DataDir "server.pid"
$OutLog = Join-Path $LogDir "server.out.log"
$ErrLog = Join-Path $LogDir "server.err.log"
$Url = "http://127.0.0.1:8765"

Add-Type -AssemblyName System.Windows.Forms

function Test-AppReady {
    try {
        Invoke-WebRequest -UseBasicParsing "$Url/api/settings" -TimeoutSec 2 | Out-Null
        return $true
    } catch {
        return $false
    }
}

function Get-SavedProcess {
    if (-not (Test-Path $PidFile)) {
        return $null
    }
    try {
        $savedPid = [int](Get-Content -Path $PidFile -Raw)
        return Get-Process -Id $savedPid -ErrorAction SilentlyContinue
    } catch {
        return $null
    }
}

New-Item -ItemType Directory -Force $LogDir | Out-Null

if (-not (Test-Path $Python)) {
    [System.Windows.Forms.MessageBox]::Show(
        "Local Python was not found: $Python",
        "Research Canvas AI",
        "OK",
        "Error"
    ) | Out-Null
    exit 1
}

$env:PYTHONUNBUFFERED = "1"

if (-not (Test-AppReady)) {
    $existing = Get-SavedProcess
    if (-not $existing) {
        $process = Start-Process `
            -WindowStyle Hidden `
            -FilePath $Python `
            -ArgumentList "server.py" `
            -WorkingDirectory $Root `
            -RedirectStandardOutput $OutLog `
            -RedirectStandardError $ErrLog `
            -PassThru
        Set-Content -Path $PidFile -Value $process.Id -Encoding ASCII
    }

    $deadline = (Get-Date).AddSeconds(20)
    while ((Get-Date) -lt $deadline) {
        if (Test-AppReady) {
            break
        }
        Start-Sleep -Milliseconds 500
    }
}

if (Test-AppReady) {
    Start-Process $Url
} else {
    $message = "Research Canvas AI did not start in time.`n`nLogs:`n$OutLog`n$ErrLog"
    [System.Windows.Forms.MessageBox]::Show($message, "Research Canvas AI", "OK", "Warning") | Out-Null
    exit 1
}
