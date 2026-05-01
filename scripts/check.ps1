$ErrorActionPreference = "Continue"

Write-Host "Python processes:"
Get-Process | Where-Object { $_.ProcessName -like "*python*" } | Select-Object Id, ProcessName, Path

Write-Host ""
Write-Host "Port 8765:"
netstat -ano | Select-String ":8765"

Write-Host ""
Write-Host "HTTP check:"
try {
    Invoke-WebRequest -UseBasicParsing "http://127.0.0.1:8765" | Select-Object StatusCode, StatusDescription
} catch {
    Write-Host $_.Exception.Message -ForegroundColor Red
}
