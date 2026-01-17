# Script to create .env file in backend folder
Write-Host "Creating .env file in backend folder..." -ForegroundColor Yellow

$envContent = @"
RAPIDAPI_HOST=cricbuzz-cricket.p.rapidapi.com
RAPIDAPI_KEY=your-rapidapi-key-here
PORT=5000
"@

$envPath = Join-Path $PSScriptRoot "backend\.env"
$envContent | Out-File -FilePath $envPath -Encoding utf8 -NoNewline

Write-Host ""
Write-Host ".env file created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT: Please edit backend\.env file and replace 'your-rapidapi-key-here' with your actual RapidAPI key." -ForegroundColor Yellow
Write-Host ""
