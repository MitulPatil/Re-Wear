# ReWear - Deployment Guide

## 🚀 Deployment Options

### Option 1: Vercel (Frontend) + Railway/Render (Backend) - Recommended

#### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set build command: `npm run build:client`
4. Set output directory: `dist`
5. Deploy

#### Backend Deployment (Railway/Render)

1. Push your code to GitHub
2. Connect your repository to Railway/Render
3. Set root directory: `server`
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables (see below)

### Option 2: Heroku (Full Stack)

1. Install Heroku CLI
2. Create Heroku app
3. Set buildpacks for Node.js
4. Deploy using: `git push heroku main`

### Option 3: DigitalOcean/AWS (VPS)

1. Set up a VPS
2. Install Node.js, MongoDB
3. Clone repository
4. Set up PM2 for process management
5. Configure Nginx as reverse proxy

## 🔧 Environment Variables

### Backend (.env file)

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/rewear?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_here_make_it_long_and_random

# Server Configuration
PORT=8000
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-domain.vercel.app

# Optional: Logging
LOG_LEVEL=info
```

### Frontend Environment Variables

For Vercel, add these in the dashboard:

```env
VITE_API_URL=https://your-backend-domain.railway.app
```

## 📦 Build Commands

### Development

```bash
npm run dev          # Start both frontend and backend
npm run server       # Start only backend
npm run client       # Start only frontend
```

### Production

```bash
npm run build        # Build both frontend and backend
npm run build:client # Build only frontend
npm run build:server # Install backend dependencies
npm run start:prod   # Start production server
```

## 🔍 Health Check

After deployment, test the health endpoint:

```
GET https://your-backend-domain.com/health
```

Expected response:

```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production"
}
```

## 🛠️ Troubleshooting

### Common Issues

1. **CORS Errors**

   - Ensure FRONTEND_URL is set correctly in backend
   - Check that the frontend URL is in the CORS allowed origins

2. **MongoDB Connection Issues**

   - Verify MONGO_URI is correct
   - Check network access to MongoDB Atlas
   - Ensure IP whitelist includes deployment server

3. **Image Upload Issues**

   - Ensure images directory exists and is writable
   - Check file permissions on server

4. **Build Failures**
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check for TypeScript errors: `npx tsc --noEmit`

### Performance Optimization

1. **Frontend**

   - Enable gzip compression
   - Use CDN for static assets
   - Implement lazy loading for images

2. **Backend**
   - Enable compression middleware
   - Implement rate limiting
   - Use caching for frequently accessed data

## 🔒 Security Checklist

- [ ] JWT_SECRET is strong and unique
- [ ] MongoDB connection uses SSL
- [ ] CORS is properly configured
- [ ] Environment variables are not exposed
- [ ] File upload size limits are set
- [ ] Input validation is implemented
- [ ] Error messages don't expose sensitive information

## 📊 Monitoring

### Recommended Tools

- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Error Tracking**: Sentry, LogRocket
- **Performance**: New Relic, DataDog
- **Logs**: Papertrail, Loggly

### Health Checks

Monitor these endpoints:

- `GET /health` - Server health
- `GET /auth/status` - Authentication status
- `GET /items` - API availability

## 🚀 Quick Deploy Commands

### Vercel + Railway

```bash
# Frontend
vercel --prod

# Backend (after setting up Railway)
railway up
```

### Heroku

```bash
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
git push heroku main
```

## 📞 Support

If you encounter issues during deployment:

1. Check the logs: `heroku logs --tail` or Railway/Render dashboard
2. Verify environment variables are set correctly
3. Test the health endpoint
4. Check MongoDB connection
5. Review CORS configuration
