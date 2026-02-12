# Quick Start Guide

Get your Altimeter webapp running in under 15 minutes!

## Prerequisites

- Google account (for API keys)
- GitHub account (for deployment)
- Text editor
- Basic familiarity with git

## Step 1: Get Your Google API Key (5 minutes)

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Go to **APIs & Services** → **Library**
4. Enable these APIs:
   - **Maps JavaScript API**
   - **Elevation API**
5. Go to **APIs & Services** → **Credentials**
6. Click **Create Credentials** → **API Key**
7. Copy your API key (starts with `AIzaSy...`)
8. Click **Restrict Key**:
   - **Application restrictions**: HTTP referrers
   - Add: `https://YOUR-USERNAME.github.io/altimeter_2/*`
   - **API restrictions**: Select only Maps JavaScript API and Elevation API
9. Save restrictions

## Step 2: Configure Your App (3 minutes)

### Replace API Key in 2 files:

**File 1: `index.html` (Line 177)**
```html
<!-- Find this line: -->
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>

<!-- Replace YOUR_API_KEY with your actual key: -->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB_YOUR_ACTUAL_KEY&callback=initMap" async defer></script>
```

**File 2: `js/main.js` (Line 5)**
```javascript
// Find this line:
const GOOGLE_API_KEY = 'YOUR_API_KEY';

// Replace with your actual key:
const GOOGLE_API_KEY = 'AIzaSyB_YOUR_ACTUAL_KEY';
```

### Update Contact Info (Optional but recommended):

**File: `contact.html`**
- Line 67: Replace `contact@example.com` with your email
- Line 85: Replace `github.com/yourusername/altimeter` with your repo URL

**File: `privacy.html`**
- Line 256: Replace `contact@example.com` with your email

## Step 3: Deploy to GitHub Pages (5 minutes)

### If this is a new repository:

```bash
# Navigate to project folder
cd /home/raghul/Documents/GitHub/altimeter_2

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Altimeter webapp"

# Create repository on GitHub (via web interface)
# Then connect and push:
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/altimeter_2.git
git push -u origin main
```

### If you already have a repository:

```bash
cd /home/raghul/Documents/GitHub/altimeter_2
git add .
git commit -m "Add Altimeter webapp"
git push
```

### Enable GitHub Pages:

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for deployment
7. Your site will be live at: `https://YOUR-USERNAME.github.io/altimeter_2/`

## Step 4: Test Your App (2 minutes)

1. Open your deployed URL in a browser
2. Click **"Start Monitoring"** button
3. Allow location permission when prompted
4. On iOS, allow motion sensor permission
5. Verify:
   - ✅ Map loads and shows your location
   - ✅ Coordinates display
   - ✅ Altitude shows (likely via Elevation API)
   - ✅ Inclinometer shows pitch/roll (on mobile)
   - ✅ All navigation links work

## Troubleshooting

### Map doesn't load
- Check API key is correct in both files
- Verify Maps JavaScript API is enabled in Google Cloud
- Check browser console for errors

### Location not working
- Ensure you're using HTTPS (GitHub Pages provides this)
- Grant location permission in browser
- Check browser location settings

### Sensors not working (mobile)
- iOS: Use Safari or Chrome (not in-app browsers)
- Grant motion permission when prompted
- Requires HTTPS

### API key error
- Verify API key restrictions match your domain
- Make sure both Maps JavaScript API and Elevation API are enabled
- Check for typos in the API key

## Quick Commands Reference

### Find remaining placeholders:
```bash
grep -r "YOUR_API_KEY\|yourusername\|contact@example\.com" --include="*.html" --include="*.js" .
```

### Test locally (requires Python):
```bash
python -m http.server 8000
# Visit http://localhost:8000
```

### Test locally (requires Node.js):
```bash
npx http-server
# Visit http://localhost:8080
```

## Next Steps

- ✅ Test on mobile devices (iOS and Android)
- ✅ Add your ad code to the footer
- ✅ Monitor API usage in Google Cloud Console
- ✅ Set up billing alerts (if expecting high traffic)
- ✅ Share your app!

## Need Help?

- 📖 Read the full [README.md](README.md)
- ✅ Check [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)
- 🔧 Review [CONFIG_TEMPLATE.md](CONFIG_TEMPLATE.md)
- 📊 See [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)

## Success!

Once you see your altitude, coordinates, and map displaying correctly, you're done! Your Altimeter webapp is now live and ready to use.

**Share your URL**: `https://YOUR-USERNAME.github.io/altimeter_2/`

---

**Estimated total time**: 15 minutes
**Difficulty**: Beginner-friendly

Enjoy tracking your altitude! 🚀
