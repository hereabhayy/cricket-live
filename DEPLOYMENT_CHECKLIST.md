# ✅ Deployment Checklist

## 📋 Pre-Deployment

### Backend:
- [x] `package.json` में production start script (`node dist/server.js`)
- [x] `tsconfig.json` में `outDir: "./dist"` set है
- [x] `.env` file में `RAPIDAPI_KEY` और `RAPIDAPI_HOST` हैं
- [x] `.gitignore` में `.env` और `node_modules` हैं
- [ ] Code GitHub पर push हो गया है

### Frontend:
- [x] `package.json` में `build` script है
- [ ] `.env` file में `REACT_APP_API_URL` है (deployment के बाद)
- [x] `.gitignore` में `.env` है
- [ ] Code GitHub पर push हो गया है

---

## 🚀 Deployment Steps

### Step 1: GitHub Setup
- [ ] GitHub account बना लिया
- [ ] New repository create किया
- [ ] Code push कर दिया

### Step 2: Backend (Render.com)
- [ ] Render.com account बना लिया
- [ ] GitHub repository connect किया
- [ ] Web Service create किया
- [ ] Settings configure किए:
  - [ ] Root Directory: `backend`
  - [ ] Build Command: `npm install && npm run build`
  - [ ] Start Command: `npm start`
- [ ] Environment Variables add किए:
  - [ ] `RAPIDAPI_KEY`
  - [ ] `RAPIDAPI_HOST`
  - [ ] `PORT`
- [ ] Deploy किया
- [ ] Backend URL note किया: `_________________`

### Step 3: Frontend (Vercel)
- [ ] Vercel account बना लिया
- [ ] GitHub repository connect किया
- [ ] New Project create किया
- [ ] Settings configure किए:
  - [ ] Root Directory: `frontend`
  - [ ] Framework: Create React App
- [ ] Environment Variable add किया:
  - [ ] `REACT_APP_API_URL` = (Backend URL from Step 2)
- [ ] Deploy किया
- [ ] Frontend URL note किया: `_________________`

---

## ✅ Post-Deployment

- [ ] Frontend URL open करके test किया
- [ ] Live matches दिख रहे हैं
- [ ] Match details page काम कर रहा है
- [ ] Filters काम कर रहे हैं
- [ ] No console errors

---

## 🔗 Your URLs

**Backend URL:** `_________________________________`  
**Frontend URL:** `_________________________________`

---

## 📝 Notes

- Render.com free tier: 750 hours/month
- Vercel: Unlimited for personal projects
- Auto-deploy: GitHub push करते ही automatic deploy

---

**Deployment Date:** `_________________`
