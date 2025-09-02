# Quick Start Guide

Get your Task Manager App running in under 5 minutes!

## 🚀 Super Quick Setup

### 1. Install Dependencies
```bash
# Install all dependencies at once
npm run install:all
```

### 2. Setup Database

**Option A: Local MongoDB** (if you have MongoDB installed)
```bash
# Start MongoDB (Windows)
net start MongoDB

# Or start MongoDB daemon (Mac/Linux)
mongod
```

**Option B: MongoDB Atlas** (Cloud - Recommended)
1. Go to https://cloud.mongodb.com
2. Create free account and cluster
3. Get connection string
4. Update `backend/.env` with your MongoDB URI

### 3. Configure Environment

**Backend** (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**Frontend** (`frontend/.env`):
```env
REACT_APP_API_URL=http://localhost:5000
```

### 4. Start the Application

**Option A: Start Both (Frontend + Backend)**
```bash
npm run dev
```

**Option B: Start Individually**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

### 5. Access Your App

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🧪 Test Everything Works

Run the API test script:
```bash
node test-api.js
```

## 📱 Test on Mobile

Open http://localhost:3000 on your mobile browser to test the responsive design!

The app is fully responsive and works great on:
- iOS Safari
- Android Chrome
- Desktop browsers

## 🌐 Deploy to Production

### Quick Deployment Options:

**Backend (Render - Recommended):**
1. Push code to GitHub
2. Connect repository to Render
3. Add environment variables
4. Deploy automatically

**Frontend (Vercel - Recommended):**
1. Run `npm run build` in frontend folder
2. Connect to Vercel
3. Deploy with one click

**Database (MongoDB Atlas):**
1. Create free cluster at mongodb.com
2. Get connection string
3. Update backend .env file

## 🆘 Troubleshooting

**Backend won't start?**
- Check if MongoDB is running
- Verify `.env` file exists in backend folder
- Make sure port 5000 is available

**Frontend can't connect?**
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Look for CORS errors in browser console

**Database connection failed?**
- Verify MongoDB is running (local) or connection string (Atlas)
- Check MongoDB Atlas IP whitelist settings
- Ensure database user has proper permissions

## 🎯 First Steps After Setup

1. Visit http://localhost:3000
2. Click "Sign Up" to create account
3. Login with your credentials
4. Create your first task
5. Try toggling task status
6. Explore filtering and sorting options

---

**You're all set! Start managing your tasks efficiently! 📝✨**
