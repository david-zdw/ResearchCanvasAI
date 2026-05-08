$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$Python = Join-Path $Root ".local-python\python\python.exe"
$Pythonw = Join-Path $Root ".local-python\python\pythonw.exe"
$UvPythonDir = Join-Path $Root ".uv-python"
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

function Find-CommandPath {
    param([string]$Name)
    $command = Get-Command $Name -ErrorAction SilentlyContinue
    if ($command) {
        return $command.Source
    }
    return $null
}

function Test-PythonExecutable {
    param([string]$Candidate)
    if (-not $Candidate -or -not (Test-Path $Candidate)) {
        return $false
    }
    try {
        & $Candidate -c "import sys; raise SystemExit(0 if sys.version_info >= (3, 10) else 1)" | Out-Null
        return $LASTEXITCODE -eq 0
    } catch {
        return $false
    }
}

function Find-InstalledPython {
    if (Test-PythonExecutable $Python) {
        return $Python
    }

    $managedPython = Get-ChildItem -LiteralPath $UvPythonDir -Recurse -Filter "python.exe" -ErrorAction SilentlyContinue |
        Where-Object { $_.FullName -notmatch "\\Scripts\\python\.exe$" } |
        Select-Object -First 1
    if ($managedPython -and (Test-PythonExecutable $managedPython.FullName)) {
        return $managedPython.FullName
    }

    $launcher = Find-CommandPath "py.exe"
    if ($launcher) {
        try {
            $candidate = (& $launcher -3 -c "import sys; print(sys.executable)" 2>$null | Select-Object -First 1).Trim()
            if (Test-PythonExecutable $candidate) {
                return $candidate
            }
        } catch {}
    }

    $pathPython = Find-CommandPath "python.exe"
    if (Test-PythonExecutable $pathPython) {
        return $pathPython
    }

    return $null
}

function Find-Uv {
    $pathUv = Find-CommandPath "uv.exe"
    if ($pathUv) {
        return $pathUv
    }
    $dailyToolsUv = "D:\$([char]0x65e5)$([char]0x5e38)$([char]0x5de5)$([char]0x5177)\uv"
    $candidates = @(
        (Join-Path $Root "uv.exe"),
        (Join-Path $Root "tools\uv\uv.exe"),
        (Join-Path $dailyToolsUv "uv-x86_64-pc-windows-msvc\uv.exe"),
        (Join-Path $dailyToolsUv "uv.exe")
    )
    foreach ($candidate in $candidates) {
        if (Test-Path $candidate) {
            return $candidate
        }
    }
    return $null
}

function Install-ManagedPython {
    $uv = Find-Uv
    if (-not $uv) {
        return $null
    }
    New-Item -ItemType Directory -Force $UvPythonDir | Out-Null
    $env:UV_CACHE_DIR = Join-Path $Root ".uv-cache"
    & $uv python install 3.12 --install-dir $UvPythonDir --no-registry --no-bin
    if ($LASTEXITCODE -ne 0) {
        return $null
    }
    return Find-InstalledPython
}

New-Item -ItemType Directory -Force $LogDir | Out-Null

$ResolvedPython = Find-InstalledPython
if (-not $ResolvedPython) {
    $ResolvedPython = Install-ManagedPython
}

if (-not $ResolvedPython) {
    [System.Windows.Forms.MessageBox]::Show(
        "Python was not found.`n`nPortable packages include .local-python automatically. If you downloaded GitHub source ZIP, install Python 3.10+ or uv, then run this launcher again.",
        "Research Canvas AI",
        "OK",
        "Error"
    ) | Out-Null
    exit 1
}

$ServerPython = $ResolvedPython
if ($ResolvedPython -eq $Python -and (Test-Path $Pythonw)) {
    $ServerPython = $Pythonw
}

$env:PYTHONUNBUFFERED = "1"
[Environment]::SetEnvironmentVariable("PATH", $null, "Process")

if (-not (Test-AppReady)) {
    $existing = Get-SavedProcess
    if (-not $existing) {
        $process = Start-Process `
            -WindowStyle Hidden `
            -FilePath $ServerPython `
            -ArgumentList "server.py" `
            -WorkingDirectory $Root `
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
    try {
        Start-Process $Url
    } catch {
        Write-Host "Research Canvas AI is running at $Url"
    }
} else {
    $message = "Research Canvas AI did not start in time.`n`nLogs:`n$OutLog`n$ErrLog"
    [System.Windows.Forms.MessageBox]::Show($message, "Research Canvas AI", "OK", "Warning") | Out-Null
    exit 1
}
