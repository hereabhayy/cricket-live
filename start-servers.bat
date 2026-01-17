@echo off
echo Starting Cricket Live Application...
echo.

echo Starting Backend Server on port 5000...
start "Backend Server" cmd /k "cd backend && npm start"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server on port 3000...
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting in separate windows!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause
