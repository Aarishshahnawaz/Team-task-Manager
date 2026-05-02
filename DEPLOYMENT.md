# 🚀 Railway Deployment Guide

Complete guide to deploy Team Task Manager on Railway.

## 📋 Prerequisites

1. **Railway Account** - Sign up at [railway.app](https://railway.app)
2. **GitHub Repository** - Your code should be on GitHub
3. **MongoDB Atlas** - Database connection string

## 🔧 Backend Deployment (API)

### Step 1: Create New Railway Project
1. Go to [railway.app](https://railway.app)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your `Team-task-Manager` repository
5. Select **"backend"** folder as root directory

### Step 2: Configure Environment Variables
In Railway dashboard, go to **Variables** tab and add:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-make-it-long-and-random
JWT_EXPIRE=30d
PORT=5000
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Step 3: Deploy Backend
1. Railway will automatically detect Node.js
2. It will run `npm install` and `npm start`
3. Your backend will be available at: `https://your-project-name.railway.app`

## 🎨 Frontend Deployment (React App)

### Option 1: Deploy on Vercel (Recommended)

#### Step 1: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"New Project"**
4. Import your `Team-task-Manager` repository
5. Set **Root Directory** to `frontend`

#### Step 2: Configure Build Settings
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

#### Step 3: Add Environment Variables
In Vercel dashboard, add:
```env
VITE_API_URL=https://your-backend-url.railway.app/api
```

### Option 2: Deploy Frontend on Railway

#### Step 1: Create Another Railway Service
1. In same Railway project, click **"New Service"**
2. Select **"GitHub Repo"**
3. Choose your repository again
4. Set **Root Directory** to `frontend`

#### Step 2: Configure Frontend Service
Add environment variable:
```env
VITE_API_URL=https://your-backend-service.railway.app/api
```

## 🔗 Connect Frontend and Backend

### Update Backend CORS
Your backend is already configured to accept requests from:
- Railway domains (*.railway.app)
- Vercel domains (*.vercel.app)
- Your custom domain

### Update Frontend API URL
The frontend will automatically use the production API URL when deployed.

## ✅ Deployment Checklist

### Before Deployment:
- [ ] MongoDB Atlas database is set up
- [ ] Environment variables are ready
- [ ] Code is pushed to GitHub
- [ ] CORS is configured for production domains

### Backend Deployment:
- [ ] Railway project created
- [ ] Environment variables added
- [ ] Backend service deployed successfully
- [ ] Health check endpoint working: `/health`

### Frontend Deployment:
- [ ] Frontend service/project created
- [ ] API URL environment variable set
- [ ] Build completed successfully
- [ ] Frontend accessible in browser

### Final Testing:
- [ ] User registration works
- [ ] User login works
- [ ] Dashboard loads correctly
- [ ] Projects can be created (Admin)
- [ ] Tasks can be created (Admin)
- [ ] Task status can be updated
- [ ] All features working end-to-end

## 🌐 Custom Domain (Optional)

### For Railway:
1. Go to your service settings
2. Click **"Domains"**
3. Add your custom domain
4. Update DNS records as instructed

### For Vercel:
1. Go to project settings
2. Click **"Domains"**
3. Add your custom domain
4. Update DNS records as instructed

## 🐛 Troubleshooting

### Common Issues:

**Backend not starting:**
- Check Railway logs for errors
- Verify environment variables
- Ensure MongoDB connection string is correct

**Frontend can't connect to backend:**
- Verify VITE_API_URL is set correctly
- Check CORS configuration
- Ensure backend is deployed and running

**Database connection failed:**
- Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for Railway)
- Verify connection string format
- Check database user permissions

**Build failures:**
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check build logs for specific errors

## 📊 Monitoring

### Railway Dashboard:
- View deployment logs
- Monitor resource usage
- Check service health
- View metrics and analytics

### Application Monitoring:
- Use `/health` endpoint for health checks
- Monitor API response times
- Check error rates in logs

## 🔄 Updates and Redeployment

### Automatic Deployment:
- Push changes to GitHub
- Railway automatically redeploys
- Vercel automatically redeploys

### Manual Deployment:
- Use Railway CLI: `railway up`
- Use Vercel CLI: `vercel --prod`

---

## 🎉 Your Team Task Manager is now live!

**Backend URL**: `https://your-backend.railway.app`
**Frontend URL**: `https://your-frontend.vercel.app`

Share your live application with the world! 🚀