# Virtual Advisory Panel — Deployment Guide

## Quick Start

### 1. Push to GitHub
Create a new repository on GitHub and push this entire folder:

```bash
cd vap-vercel
git init
git add .
git commit -m "Initial VAP deployment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/virtual-advisory-panel.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to vercel.com and sign in with your GitHub account
2. Click "Add New Project"
3. Import your `virtual-advisory-panel` repository
4. Vercel will auto-detect Vite — leave all settings as default
5. Click "Deploy"
6. Your gallery will be live at a URL like `virtual-advisory-panel.vercel.app`

### 3. Embed in WordPress
Add a Custom HTML block to any WordPress page with:

```html
<iframe
  src="https://YOUR-PROJECT.vercel.app"
  width="100%"
  height="2000"
  style="border: none; max-width: 1200px; margin: 0 auto; display: block;"
  title="Virtual Advisory Panel"
></iframe>
```

Adjust the height as needed. The iframe will scroll independently, or you can use a script to auto-resize it to fit the content.

### Auto-Resize Iframe (Optional)
For a seamless embedded experience, add this script below the iframe:

```html
<script>
  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'resize') {
      document.querySelector('iframe').style.height = e.data.height + 'px';
    }
  });
</script>
```

## Updating
Any push to the `main` branch on GitHub will automatically trigger a new Vercel deployment. Changes go live in about 60 seconds.

## Custom Domain
In Vercel project settings, you can add a custom domain (e.g., `panel.filament.com`) under Settings > Domains.

## Tech Stack
- React 18
- Vite (build tool)
- JSZip (client-side zip generation)
- Google Fonts (Libre Baskerville, DM Sans)
- No backend required — everything runs in the browser
