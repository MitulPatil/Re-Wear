# ReWear - Community Clothing Exchange

A sustainable fashion platform where users can list, browse, swap, and purchase clothing items using a points-based reward system.

## ✨ Features

- *👕 Item Management*: List and manage clothing items
- *🔄 Swap System*: Trade items with other users
- *🎁 Points Marketplace*: Redeem points for rewards
- *👤 User Profiles*: Edit profile and upload avatars
- *🌙 Dark/Light Mode*: Toggle themes
- *📱 Responsive Design*: Works on all devices
- *🔐 Secure Authentication*: JWT-based login system

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account

### Setup

1. *Clone & Install*
   bash
   git clone <your-repo-url>
   cd rewear-community-clothing-exchange
   npm install
   cd server && npm install
   

2. *Environment Setup*
   bash
   # Create .env file in server directory
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/rewear?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key
   PORT=8000
   NODE_ENV=development
   

3. *Start Development*
   bash
   npm run dev  # Start both frontend & backend
   

4. *Open Browser*
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000

## 🛠 Scripts

bash
npm run dev          # Development mode
npm run build        # Build for production
npm run start:prod   # Start production server


## 🚀 Deployment

### Frontend (Vercel)
- Build Command: npm run build:client
- Output Directory: dist

### Backend (Railway/Render/Heroku)
- Root Directory: server
- Start Command: npm start

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📁 Structure


├── src/              # React frontend
├── server/           # Node.js backend
├── images/           # Static images
└── dist/             # Production build


## 🔧 Tech Stack

- *Frontend*: React, TypeScript, Tailwind CSS, Vite
- *Backend*: Node.js, Express, MongoDB
- *Authentication*: JWT
- *Styling*: Tailwind CSS
- *Icons*: Lucide React

## 📞 Support

For issues, check:
1. Environment variables are set correctly
2. MongoDB connection is working
3. Health endpoint: GET /health

---

*Happy sustainable fashion! 🌱👕*

Team Name:
Dipesh Chaubey 
Mitul Patil
Omkumar Parmar
Singh Shashi
