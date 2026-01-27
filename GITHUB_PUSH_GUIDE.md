# 🚀 How to Push to GitHub

## Quick Method (Recommended)

### Step 1: Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `industrial-attachment-system`
3. Description: "Industrial Attachment & Internship Management System with M-Pesa Integration"
4. Choose **Private** or **Public**
5. ⚠️ **DO NOT** check "Initialize this repository with a README"
6. Click **"Create repository"**

### Step 2: Push Your Code

Open your terminal and run these commands:

```bash
# Navigate to the project folder
cd /path/to/industrial-attachment-system

# Initialize git
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial commit: Complete Industrial Attachment System"

# Add your GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/industrial-attachment-system.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME`** with your actual GitHub username!

---

## Alternative: Using GitHub Desktop

1. Download GitHub Desktop: https://desktop.github.com/
2. Open GitHub Desktop
3. Click **File → Add Local Repository**
4. Select the `industrial-attachment-system` folder
5. Click **"Create Repository"**
6. Click **"Publish repository"**
7. Choose name and visibility
8. Click **"Publish Repository"**

---

## After Pushing

Your repository will be at:
```
https://github.com/YOUR_USERNAME/industrial-attachment-system
```

### Set Up Repository Secrets (for CI/CD)

For the GitHub Actions workflow to work, add these secrets:

1. Go to your repository on GitHub
2. Click **Settings → Secrets and variables → Actions**
3. Click **"New repository secret"**
4. Add these secrets:

```
REGISTRY_USERNAME          → Your Docker registry username
REGISTRY_PASSWORD          → Your Docker registry password
KUBE_CONFIG               → Your Kubernetes config (base64 encoded)
```

To get base64 encoded kubeconfig:
```bash
cat ~/.kube/config | base64
```

---

## Verify Your Push

After pushing, you should see:
- ✅ All folders (backend, frontend, k8s, .github)
- ✅ README.md displaying on main page
- ✅ .gitignore working (no node_modules, .env files)

---

## Common Issues

### "Repository already exists"
If you get an error, it means you checked "Initialize with README". Either:
- Delete the repository and recreate without README
- Or force push: `git push -u origin main --force`

### Authentication Error
If you get auth errors:
- Use **Personal Access Token** instead of password
- Get token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token
- Use token as password when pushing

---

## Next Steps

1. ✅ Push to GitHub
2. 🔒 Add repository secrets for CI/CD
3. 🚀 Deploy to your server/cloud
4. 📧 Invite collaborators (Settings → Collaborators)

---

## Clone on Another Machine

After pushing, you can clone on any machine:

```bash
git clone https://github.com/YOUR_USERNAME/industrial-attachment-system.git
cd industrial-attachment-system
```

---

Need help? Check: https://docs.github.com/en/get-started/importing-your-projects-to-github/importing-source-code-to-github/adding-locally-hosted-code-to-github
