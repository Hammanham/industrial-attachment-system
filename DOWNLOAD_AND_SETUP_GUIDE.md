# 📥 DOWNLOAD & SETUP GUIDE

## Industrial Attachment AND Internship System - Complete Installation Instructions

---

## METHOD 1: Download from Claude (EASIEST) ⭐

### Step 1: Download the Archive
You should see a download link for `industrial-attachment-system.tar.gz` file.

**Click the download button/link** to save it to your computer.

### Step 2: Extract the Archive

**On Windows:**
1. Install 7-Zip (https://www.7-zip.org/) if you don't have it
2. Right-click the `.tar.gz` file
3. Choose `7-Zip → Extract Here`
4. You'll get a folder called `industrial-attachment-system`

**On Mac:**
```bash
tar -xzf industrial-attachment-system.tar.gz
```

**On Linux:**
```bash
tar -xzf industrial-attachment-system.tar.gz
```

### Step 3: Navigate to the Folder
```bash
cd industrial-attachment-system
```

**You're done!** Now skip to the "Push to GitHub" section below.

---

## METHOD 2: Copy Files Manually

If download doesn't work, you can copy files manually:

### Step 1: Create Project Structure

```bash
# Create main directory
mkdir industrial-attachment-system
cd industrial-attachment-system

# Create subdirectories
mkdir -p backend/src/{controllers,models,routes,middleware,config,utils}
mkdir -p frontend/src/{components,pages,services,context,hooks,assets}
mkdir -p k8s/{backend,frontend,database}
mkdir -p .github/workflows
```

### Step 2: Copy Files from Claude

I'll provide all files in individual messages. For each file:
1. Create the file in the correct location
2. Copy the content
3. Save it

**List of files to copy:**

Backend files:
- `backend/package.json`
- `backend/Dockerfile`
- `backend/.env.example`
- `backend/src/server.js`
- `backend/src/config/config.js`
- `backend/src/models/User.js`
- `backend/src/models/Opportunity.js`
- `backend/src/models/Application.js`
- `backend/src/controllers/authController.js`
- `backend/src/controllers/opportunityController.js`
- `backend/src/controllers/applicationController.js`
- `backend/src/controllers/uploadController.js`
- `backend/src/routes/auth.js`
- `backend/src/routes/opportunities.js`
- `backend/src/routes/applications.js`
- `backend/src/routes/upload.js`
- `backend/src/middleware/auth.js`
- `backend/src/middleware/upload.js`
- `backend/src/utils/mpesaService.js`
- `backend/src/utils/fileUpload.js`

Frontend files:
- `frontend/package.json`
- `frontend/Dockerfile`
- `frontend/.env.example`
- `frontend/vite.config.js`
- `frontend/tailwind.config.js`
- `frontend/postcss.config.js`
- `frontend/index.html`
- `frontend/nginx.conf`
- `frontend/src/main.jsx`
- `frontend/src/App.jsx`
- `frontend/src/index.css`
- `frontend/src/services/api.js`
- `frontend/src/context/authStore.js`
- `frontend/src/components/Navbar.jsx`
- `frontend/src/components/PrivateRoute.jsx`
- `frontend/src/pages/Home.jsx`
- `frontend/src/pages/Login.jsx`
- `frontend/src/pages/Register.jsx`
- `frontend/src/pages/Opportunities.jsx`
- `frontend/src/pages/OpportunityDetail.jsx`
- `frontend/src/pages/Apply.jsx`
- `frontend/src/pages/Dashboard.jsx`
- `frontend/src/pages/MyApplications.jsx`

Kubernetes files:
- `k8s/namespace.yaml`
- `k8s/configmap.yaml`
- `k8s/ingress.yaml`
- `k8s/backend/deployment.yaml`
- `k8s/backend/service.yaml`
- `k8s/frontend/deployment.yaml`
- `k8s/frontend/service.yaml`
- `k8s/database/secret.yaml`

GitHub Actions:
- `.github/workflows/deploy.yml`

Root files:
- `README.md`
- `QUICK_START.md`
- `GITHUB_PUSH_GUIDE.md`
- `.gitignore`

---

## 🚀 PUSH TO GITHUB

Once you have the files (either downloaded or copied):

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `industrial-attachment-system`
3. Description: "Industrial Attachment & Internship Management System with M-Pesa"
4. Choose **Private** or **Public**
5. **⚠️ DO NOT check "Add a README file"**
6. Click **"Create repository"**

### Step 2: Initialize Git and Push

Open terminal in your project folder and run:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Complete Industrial Attachment System"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/industrial-attachment-system.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**🎉 Done! Your code is now on GitHub!**

---

## 🔧 LOCAL DEVELOPMENT SETUP

### Prerequisites
Install these first:
- Node.js 18+ (https://nodejs.org)
- MongoDB (https://www.mongodb.com/try/download/community)
- Git (https://git-scm.com/downloads)

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials:
# nano .env  (on Mac/Linux)
# notepad .env  (on Windows)

# Required credentials:
# - MongoDB URI
# - M-Pesa credentials (from https://developer.safaricom.co.ke)
# - Cloudinary credentials (from https://cloudinary.com)

# Start backend
npm run dev
```

Backend runs on: http://localhost:5000

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start frontend
npm run dev
```

Frontend runs on: http://localhost:3000

---

## 🔑 GET API CREDENTIALS

### M-Pesa (Safaricom)
1. Go to https://developer.safaricom.co.ke
2. Register/Login
3. Create new app
4. Get:
   - Consumer Key
   - Consumer Secret
   - Business Shortcode
   - Passkey
5. Use **sandbox** for testing

### Cloudinary (File Storage)
1. Go to https://cloudinary.com
2. Sign up (free account)
3. Get from dashboard:
   - Cloud Name
   - API Key
   - API Secret

---

## 📦 DOCKER DEPLOYMENT

```bash
# Build images
docker build -t my-backend ./backend
docker build -t my-frontend ./frontend

# Run containers
docker run -d -p 5000:5000 --env-file backend/.env my-backend
docker run -d -p 3000:80 my-frontend
```

---

## ☸️ KUBERNETES DEPLOYMENT

### Prerequisites
- Kubernetes cluster (Minikube, EKS, GKE, AKS)
- kubectl installed
- Docker images pushed to registry

### Deploy

```bash
# Edit secrets first
nano k8s/database/secret.yaml

# Apply configs
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/database/secret.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/backend/
kubectl apply -f k8s/frontend/
kubectl apply -f k8s/ingress.yaml

# Check status
kubectl get pods -n industrial-attachment
kubectl get services -n industrial-attachment
```

---

## 📱 TESTING THE APP

1. **Register User:**
   - Go to http://localhost:3000/register
   - Fill in details (phone: 254XXXXXXXXX)
   - Submit

2. **Browse Opportunities:**
   - Click "Opportunities"
   - View available positions

3. **Apply:**
   - Click on opportunity
   - Click "Apply"
   - Fill application form
   - Upload resume
   - Upload referral form
   - Pay KES 500 (M-Pesa STK push)
   - Submit

4. **Track Application:**
   - Go to "My Applications"
   - View status

---

## 🆘 TROUBLESHOOTING

### Can't download file?
- Try right-click → Save As
- Or use METHOD 2 (manual copy)

### Git push fails?
```bash
# If authentication fails, use personal access token:
# GitHub → Settings → Developer settings → Personal access tokens
# Generate token, use as password
```

### Backend won't start?
- Check MongoDB is running
- Verify .env file exists
- Check port 5000 isn't in use

### Frontend can't connect?
- Ensure backend is running
- Check VITE_API_URL in .env
- Clear browser cache

---

## 📧 FILE STRUCTURE REMINDER

```
industrial-attachment-system/
├── backend/              ← Node.js API
├── frontend/             ← React app
├── k8s/                  ← Kubernetes configs
├── .github/workflows/    ← CI/CD
├── README.md
├── QUICK_START.md
└── .gitignore
```

---

## ✅ CHECKLIST

Before deploying:
- [ ] Downloaded/copied all files
- [ ] Initialized git repository
- [ ] Pushed to GitHub
- [ ] Got M-Pesa credentials
- [ ] Got Cloudinary credentials
- [ ] Created .env files
- [ ] Tested locally
- [ ] Updated secret.yaml
- [ ] Deployed to Kubernetes (optional)

---

## 🎯 NEXT STEPS

1. ✅ Download files
2. ✅ Push to GitHub
3. 🔧 Get API credentials
4. 🚀 Run locally
5. ☁️ Deploy to cloud

---

**Need Help?**
- Check README.md for full docs
- Check QUICK_START.md for quick setup
- Open GitHub issue for bugs

**Your app is ready! 🎉**
