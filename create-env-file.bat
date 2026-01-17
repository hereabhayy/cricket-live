@echo off
echo Creating .env file in backend folder...
echo.

cd backend

(
echo RAPIDAPI_HOST=cricbuzz-cricket.p.rapidapi.com
echo RAPIDAPI_KEY=your-rapidapi-key-here
echo PORT=5000
) > .env

echo .env file created successfully!
echo.
echo IMPORTANT: Please edit backend\.env file and replace "your-rapidapi-key-here" with your actual RapidAPI key.
echo.
pause
