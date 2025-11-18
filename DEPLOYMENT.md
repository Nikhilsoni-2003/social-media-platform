# AWS Amplify Deployment Guide

## Prerequisites
- AWS account with Amplify access
- Git repository (GitHub, GitLab, Bitbucket, or CodeCommit)
- Your frontend code pushed to the repository

## Step 1: Update Backend CORS

Before deploying, you need to add your Amplify URL to the backend CORS configuration.

1. Go to `backend/index.js`
2. Add your Amplify app URL to the `origin` array in the CORS configuration:
   ```javascript
   origin: [
     "http://localhost:5173",
     "https://main.d1o7mnrhj60m.amplifyapp.com",
     "https://social-media-platform-l27o.onrender.com",
     "https://YOUR-AMPLIFY-APP-ID.amplifyapp.com" // Add this after deployment
   ]
   ```
3. Also update `backend/socket.js` with the same URL in the `allowedOrigins` array
4. Redeploy your backend on Render after adding the new origin

## Step 2: Deploy to AWS Amplify

### Option A: Using AWS Amplify Console (Recommended)

1. **Sign in to AWS Amplify Console**
   - Go to https://console.aws.amazon.com/amplify/
   - Sign in with your AWS account

2. **Connect Repository**
   - Click "New app" → "Host web app"
   - Choose your Git provider (GitHub, GitLab, Bitbucket, or CodeCommit)
   - Authorize AWS Amplify to access your repository
   - Select your repository and branch (usually `main` or `master`)

3. **Configure Build Settings**
   - AWS Amplify will auto-detect the `amplify.yml` file in your repo root
   - Verify the settings:
     - **App name**: Your app name
     - **Environment**: Production (or create a new one)
     - **Build settings**: Should auto-detect from `amplify.yml`

4. **Review and Deploy**
   - Review the configuration
   - Click "Save and deploy"
   - Wait for the build to complete (usually 3-5 minutes)

5. **Get Your App URL**
   - Once deployed, you'll get a URL like: `https://main.xxxxx.amplifyapp.com`
   - Copy this URL

### Option B: Using AWS CLI

```bash
# Install AWS CLI if not already installed
# Then configure it:
aws configure

# Create Amplify app
aws amplify create-app --name social-media-platform --repository https://github.com/yourusername/yourrepo

# Create branch
aws amplify create-branch --app-id YOUR_APP_ID --branch-name main

# Start deployment
aws amplify start-job --app-id YOUR_APP_ID --branch-name main --job-type RELEASE
```

## Step 3: Update Backend CORS with Amplify URL

After getting your Amplify URL:

1. Update `backend/index.js` CORS origins
2. Update `backend/socket.js` allowed origins
3. Redeploy backend on Render

## Step 4: Environment Variables (if needed)

If you need to set environment variables in Amplify:

1. Go to your Amplify app in the console
2. Navigate to "App settings" → "Environment variables"
3. Add any required variables (though your backend URL is hardcoded in App.jsx)

## Step 5: Custom Domain (Optional)

1. In Amplify console, go to "Domain management"
2. Click "Add domain"
3. Enter your domain name
4. Follow the DNS configuration instructions

## Troubleshooting

### Build Fails
- Check build logs in Amplify console
- Ensure `package.json` has correct build script
- Verify Node.js version (Amplify uses Node 18 by default)

### CORS Errors
- Make sure your Amplify URL is added to backend CORS
- Check that backend is redeployed after CORS update
- Verify `withCredentials: true` is set in all axios requests

### 401 Errors
- Clear browser cookies
- Verify backend cookie settings (SameSite=None, Secure=true)
- Check that backend is running and accessible

## Notes

- The `amplify.yml` file is configured for a monorepo structure (frontend folder)
- Build output goes to `frontend/dist`
- Amplify will automatically deploy on every push to your main branch (if auto-deploy is enabled)

