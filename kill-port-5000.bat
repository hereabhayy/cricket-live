@echo off
echo Checking for processes on port 5000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do (
    echo Killing process with PID: %%a
    taskkill /PID %%a /F
)
echo Port 5000 is now free!
pause
