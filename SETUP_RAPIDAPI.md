# RapidAPI Setup Guide

## Step 1: Create RapidAPI Account
1. Go to https://rapidapi.com
2. Sign up for a free account (or login if you already have one)

## Step 2: Subscribe to Cricbuzz Cricket API
1. Visit: https://rapidapi.com/cricbuzz-cricket-cricbuzz-cricket-default/api/cricbuzz-cricket
2. Click on "Subscribe to Test" or choose a plan
3. The free tier usually provides limited requests per month

## Step 3: Get Your API Key
1. After subscribing, go to your RapidAPI dashboard
2. Navigate to "My Apps" or "API Keys"
3. Copy your API key (it looks like: `abc123def456ghi789...`)

## Step 4: Configure Environment Variables

### Create `.env` file in `backend` folder:

1. Navigate to the `backend` folder
2. Create a new file named `.env` (no extension)
3. Add the following content:

```env

```

**Important:** Replace `your-actual-api-key-here` with your actual RapidAPI key!

## Step 5: Restart Backend Server

After creating the `.env` file:

1. Stop the backend server (Ctrl + C)
2. RestartRAPIDAPI_HOST=cricbuzz-cricket.p.rapidapi.com
RAPIDAPI_KEY=your-actual-api-key-here
PORT=5000 it:
   ```powershell
   cd backend
   npm start
   ```

## Verification

Once configured, you should see:
- ✅ Real live cricket scores instead of mock data
- ✅ No "RapidAPI key not configured" warning in backend logs

## Notes

- Keep your `.env` file secure and never commit it to Git
- The `.env` file is already in `.gitignore` to prevent accidental commits
- Free tier APIs usually have rate limits (requests per day/month)
