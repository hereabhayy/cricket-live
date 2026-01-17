# 🚀 Cricket Live App - Deployment Guide

## 📋 Overview

आपको दो parts deploy करने होंगे:
1. **Backend** (Node.js/Express) - API server
2. **Frontend** (React) - Web application

---

## 🎯 Recommended Platforms

### Backend Deployment Options:
1. **Render.com** (Recommended - Free tier available) ⭐
2. **Railway.app** (Easy setup)
3. **Heroku** (Paid, but reliable)
4. **Vercel** (Serverless functions)

### Frontend Deployment Options:
1. **Vercel** (Recommended - Best for React) ⭐
2. **Netlify** (Easy, free)
3. **GitHub Pages** (Free, but limited)

---

## 🏗️ Option 1: Render.com (Backend) + Vercel (Frontend) - RECOMMENDED

### Step 1: Prepare Backend for Deployment

#### 1.1 Update Backend package.json
```json
"scripts": {
  "start": "node dist/server.js",
  "dev": "nodemon src/server.ts",
  "build": "tsc",
  "postinstall": "npm run build"
}
```

#### 1.2 Create .gitignore (if not exists)
```
node_modules/
dist/
.env
*.log
.DS_Store
```

### Step 2: Deploy Backend on Render.com

1. **GitHub पर code push करें:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/cricket-live.git
   git push -u origin main
   ```

2. **Render.com पर account बनाएं:**
   - https://render.com पर जाएं
   - "Get Started for Free" click करें
   - GitHub account से sign in करें

3. **New Web Service create करें:**
   - Dashboard से "New +" → "Web Service" click करें
   - GitHub repository select करें
   - Settings:
     - **Name:** `cricket-live-backend`
     - **Environment:** `Node`
     - **Build Command:** `npm install && npm run build`
     - **Start Command:** `npm start`
     - **Root Directory:** `backend`

4. **Environment Variables add करें:**
   - "Environment" section में:
     ```
     RAPIDAPI_KEY=your-rapidapi-key-here
     RAPIDAPI_HOST=cricbuzz-cricket.p.rapidapi.com
     PORT=10000
     ```
   - Save करें

5. **Deploy करें:**
   - "Create Web Service" click करें
   - Wait for deployment (5-10 minutes)
   - Backend URL मिलेगा: `https://cricket-live-backend.onrender.com`

### Step 3: Deploy Frontend on Vercel

1. **Frontend folder में .env file बनाएं:**
   ```
   REACT_APP_API_URL=https://cricket-live-backend.onrender.com/api/cricket
   ```

2. **Vercel पर deploy करें:**
   - https://vercel.com पर जाएं
   - GitHub account से sign in करें
   - "Add New Project" click करें
   - Repository select करें
   - Settings:
     - **Framework Preset:** Create React App
     - **Root Directory:** `frontend`
     - **Build Command:** `npm run build`
     - **Output Directory:** `build`
     - **Environment Variables:**
       ```
       REACT_APP_API_URL=https://cricket-live-backend.onrender.com/api/cricket
       ```

3. **Deploy करें:**
   - "Deploy" click करें
   - Frontend URL मिलेगा: `https://cricket-live.vercel.app`

---

## 🚂 Option 2: Railway.app (Backend) + Netlify (Frontend)

### Backend on Railway:

1. **Railway.app पर account बनाएं:**
   - https://railway.app पर जाएं
   - GitHub से sign in करें

2. **New Project create करें:**
   - "New Project" → "Deploy from GitHub repo"
   - Repository select करें

3. **Settings configure करें:**
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

4. **Environment Variables:**
   - Variables tab में add करें:
     ```
     RAPIDAPI_KEY=your-key
     RAPIDAPI_HOST=cricbuzz-cricket.p.rapidapi.com
     ```

5. **Deploy:**
   - Automatic deploy होगा
   - URL मिलेगा: `https://cricket-live-production.up.railway.app`

### Frontend on Netlify:

1. **Netlify पर account बनाएं:**
   - https://netlify.com पर जाएं
   - GitHub से sign in करें

2. **New site from Git:**
   - "Add new site" → "Import an existing project"
   - Repository select करें

3. **Build settings:**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/build`

4. **Environment variables:**
   - Site settings → Environment variables:
     ```
     REACT_APP_API_URL=https://cricket-live-production.up.railway.app/api/cricket
     ```

5. **Deploy:**
   - "Deploy site" click करें
   - URL मिलेगा: `https://cricket-live.netlify.app`

---

## 📝 Pre-Deployment Checklist

### Backend:
- [ ] `package.json` में production start script है
- [ ] `tsconfig.json` में `outDir` set है
- [ ] `.env` file में सभी variables हैं
- [ ] `.gitignore` में `.env` और `node_modules` हैं
- [ ] Code GitHub पर push हो गया है

### Frontend:
- [ ] `package.json` में build script है
- [ ] `.env` file में `REACT_APP_API_URL` है
- [ ] `.gitignore` में `.env` है
- [ ] Code GitHub पर push हो गया है

---

## 🔧 Important Notes

### Backend:
1. **Port:** Render/Railway automatically PORT assign करते हैं
2. **Build:** TypeScript compile होना चाहिए (`npm run build`)
3. **Start:** Production में `node dist/server.js` run होना चाहिए

### Frontend:
1. **API URL:** Production में backend URL use करें
2. **Build:** `npm run build` से `build` folder बनेगा
3. **Environment Variables:** `REACT_APP_` prefix जरूरी है

---

## 🐛 Troubleshooting

### Backend Issues:
- **Build fails:** Check TypeScript errors
- **Server not starting:** Check PORT environment variable
- **API not working:** Verify RAPIDAPI_KEY is set

### Frontend Issues:
- **API calls failing:** Check REACT_APP_API_URL
- **Build fails:** Check for console errors
- **CORS errors:** Backend में CORS properly configured है

---

## 📞 Support

अगर deployment में कोई problem हो, तो:
1. Platform के logs check करें
2. Environment variables verify करें
3. Build commands check करें

---

**Last Updated:** $(date)
