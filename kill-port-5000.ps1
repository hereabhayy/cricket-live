# Script to kill process running on port 5000
Write-Host "Checking for processes on port 5000..." -ForegroundColor Yellow

$processes = netstat -ano | findstr :5000 | Select-String "LISTENING"

if ($processes) {
    $pids = $processes | ForEach-Object {
        ($_ -split '\s+')[-1]
    } | Select-Object -Unique
    
    foreach ($pid in $pids) {
        Write-Host "Killing process with PID: $pid" -ForegroundColor Red
        taskkill /PID $pid /F
    }
    Write-Host "Port 5000 is now free!" -ForegroundColor Green
} else {
    Write-Host "No process found on port 5000" -ForegroundColor Green
}
