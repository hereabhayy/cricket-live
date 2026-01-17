# .env File Setup Instructions

## Step 1: Create .env File

**Location:** `backend` folder में

**Method 1: File Explorer से (सबसे आसान)**

1. `backend` folder खोलें
2. Right-click करें → New → Text Document
3. File का नाम रखें: `.env` (बिना extension)
   - Windows warning दिखेगा: "Are you sure you want to change the extension?" → **Yes** click करें
4. File को Notepad में खोलें

**Method 2: Command Prompt से**

Command Prompt (CMD) खोलें (PowerShell नहीं):

```cmd
cd C:\Users\abhay\Downloads\cricket-live\cricket-live\backend
echo RAPIDAPI_HOST=cricbuzz-cricket.p.rapidapi.com > .env
echo RAPIDAPI_KEY=your-rapidapi-key-here >> .env
echo PORT=5000 >> .env
```

## Step 2: File Content

`.env` file में यह content होना चाहिए:

```
RAPIDAPI_HOST=cricbuzz-cricket.p.rapidapi.com
RAPIDAPI_KEY=your-rapidapi-key-here
PORT=5000
```

## Step 3: Replace API Key

`your-rapidapi-key-here` को अपनी actual RapidAPI key से replace करें।

**RapidAPI Key कैसे मिलेगी:**
1. https://rapidapi.com पर account बनाएं/login करें
2. https://rapidapi.com/cricbuzz-cricket-cricbuzz-cricket-default/api/cricbuzz-cricket पर जाएं
3. "Subscribe to Test" या कोई plan choose करें
4. Dashboard से API key copy करें
5. `.env` file में paste करें

## Step 4: Save और Restart

1. File save करें
2. Backend server restart करें:
   ```powershell
   cd backend
   npm start
   ```

## Verification

Backend terminal में यह दिखना चाहिए:
- ✅ "Server is running on http://localhost:5000"
- ❌ कोई "RapidAPI credentials not configured" error नहीं होनी चाहिए

## Important Notes

- `.env` file `backend` folder में होनी चाहिए (project root में नहीं)
- File का exact name होना चाहिए: `.env` (no extension)
- Spaces नहीं होने चाहिए: `RAPIDAPI_KEY=value` (not `RAPIDAPI_KEY = value`)
- Quotes की जरूरत नहीं: `RAPIDAPI_KEY=abc123` (not `RAPIDAPI_KEY="abc123"`)
