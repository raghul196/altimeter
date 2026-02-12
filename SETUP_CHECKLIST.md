# Setup Checklist for Altimeter Webapp

Use this checklist to ensure your Altimeter webapp is properly configured before deployment.

## Pre-Deployment Checklist

### 1. Google API Configuration

- [x] Create Google Cloud project
- [x] Enable Maps JavaScript API
- [x] Enable Elevation API
- [x] Create API key
- [ ] Add API key restrictions:
  - [ ] HTTP referrer restriction (e.g., `https://yourusername.github.io/altimeter_2/*`)
  - [ ] API restrictions (Maps JavaScript API + Elevation API only)
- [x] Note down your API key securely

### 2. Code Configuration

- [x] Replace `YOUR_API_KEY` in `index.html` (line 177)
- [x] Replace `YOUR_API_KEY` in `js/main.js` (line 5)
- [x] Update contact email in `contact.html`
- [ ] Update GitHub repository links in `contact.html`
- [x] Update contact email in `privacy.html`

### 3. Content Customization (Optional)

- [ ] Update app name/branding if desired
- [ ] Modify color scheme in Tailwind classes
- [ ] Add your ad network code to footer (replace "Advertisement Space")
- [ ] Update README.md with your information

### 4. Testing

- [ ] Test locally using a local server (http-server or Python)
- [ ] Verify geolocation permission prompt works
- [ ] Check altitude display (should fallback to Elevation API)
- [ ] Test inclinometer on mobile device
- [ ] Verify map loads correctly
- [ ] Test all navigation links work
- [ ] Check mobile responsive design
- [ ] Verify sticky footer behavior on mobile

### 5. GitHub Repository Setup

- [ ] Create new GitHub repository (or use existing)
- [ ] Initialize git in project folder: `git init`
- [ ] Add all files: `git add .`
- [ ] Create initial commit: `git commit -m "Initial commit: Altimeter webapp"`
- [ ] Add remote: `git remote add origin <your-repo-url>`
- [ ] Push to GitHub: `git push -u origin main`

### 6. GitHub Pages Deployment

- [ ] Go to repository Settings
- [ ] Navigate to Pages section
- [ ] Set source to `main` branch and `/ (root)` folder
- [ ] Save settings
- [ ] Wait for deployment (usually 1-2 minutes)
- [ ] Visit your site at `https://yourusername.github.io/repository-name/`

### 7. Post-Deployment Verification

- [ ] Visit deployed site and verify it loads
- [ ] Test on mobile device (iOS and Android if possible)
- [ ] Check HTTPS certificate is active
- [ ] Verify geolocation works on deployed site
- [ ] Test iOS DeviceOrientation permission prompt
- [ ] Verify Google Maps loads correctly
- [ ] Check altitude data displays (GPS or Elevation API)
- [ ] Test all page links
- [ ] Verify mobile sticky footer works

### 8. API Key Security (CRITICAL)

- [ ] Verify API key restrictions are active in Google Cloud Console
- [ ] Confirm restrictions match your deployed domain
- [ ] Never commit API keys to public repositories (already in .gitignore)
- [ ] Monitor API usage in Google Cloud Console
- [ ] Set up billing alerts if expecting high traffic

### 9. Optional Enhancements

- [ ] Add Google Analytics (if desired)
- [ ] Integrate ad network (Google AdSense, etc.)
- [ ] Add custom domain (if available)
- [ ] Set up custom 404 page
- [ ] Add favicon and app icons
- [ ] Implement PWA features (manifest.json, service worker)
- [ ] Add Open Graph tags for social sharing

## Common Issues and Solutions

### Map not loading
- Check API key is correct in both files
- Verify Maps JavaScript API is enabled
- Check browser console for errors
- Ensure domain restrictions match deployed URL

### Location not working
- Requires HTTPS (GitHub Pages provides this)
- User must grant permission
- Check browser location settings

### iOS DeviceOrientation not working
- Only works in Safari and Chrome (not in-app browsers)
- User must grant permission when prompted
- Requires HTTPS

### Altitude always showing Elevation API
- Normal behavior - most devices don't provide GPS altitude
- Elevation API is more accurate anyway
- No action needed

## Maintenance

### Regular Tasks
- [ ] Monitor Google API usage monthly
- [ ] Check for browser compatibility updates
- [ ] Update dependencies (Tailwind CSS CDN)
- [ ] Review and respond to user feedback

### Security
- [ ] Periodically regenerate API keys
- [ ] Review API key restrictions
- [ ] Check for security advisories

## Support

If you encounter issues not covered here:
1. Check the README.md file
2. Review browser console for error messages
3. Search GitHub issues
4. Create new issue with details

---

**Estimated Setup Time**: 30-45 minutes (including Google Cloud setup)

**Next Steps After Completion**: Share your app, gather feedback, and iterate!
