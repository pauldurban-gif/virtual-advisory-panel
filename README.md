# Virtual Advisory Panel — Deployment Guide

## Quick Start

### 1. Get the files into your GitHub repository

Go to your repository on GitHub, click "Add file" then "Upload files." Unzip this project and drag the contents into the upload area:

- package.json
- vite.config.js
- index.html
- .gitignore
- src/ folder (contains main.jsx and VAPGallery.jsx)
- public/ folder

Click "Commit changes" when they're uploaded.

### 2. Deploy on Vercel

1. Go to vercel.com and sign in with your GitHub account
2. Click "Add New Project"
3. Find your repository in the list — if you don't see it, click "Adjust GitHub App Permissions" and grant Vercel access to the repo
4. Vercel will auto-detect it's a Vite project — leave all settings as default
5. Click "Deploy"
6. Wait about 60 seconds — Vercel will give you a live URL

### 3. Embed in WordPress

Add a Custom HTML block to any WordPress page with:

```html
<iframe
  src="https://YOUR-VERCEL-URL.vercel.app"
  width="100%"
  height="2000"
  style="border: none; max-width: 1200px; margin: 0 auto; display: block;"
  title="Virtual Advisory Panel"
></iframe>
```

Replace the URL with whatever Vercel gave you. Adjust the height as needed.

## Updating

Any push to the main branch on GitHub will automatically trigger a new Vercel deployment. Changes go live in about 60 seconds.

## Custom Domain

In Vercel project settings, you can add a custom domain (e.g., panel.filament.com) under Settings > Domains.
