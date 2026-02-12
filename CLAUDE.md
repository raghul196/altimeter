# Altimeter Webapp - Claude Code Instructions

## Project Overview

This is a static web application for real-time altitude tracking with device sensors and mapping. Designed for mobile-first usage and GitHub Pages deployment.

**Status**: Production-ready, awaiting API key configuration
**Tech Stack**: Vanilla JavaScript, HTML5, CSS3, Tailwind CSS (CDN), Google Maps API
**Deployment**: GitHub Pages (static hosting)

## Project Structure

```
altimeter_2/
├── index.html          # Main application page
├── about.html          # About page
├── contact.html        # Contact page
├── privacy.html        # Privacy policy
├── js/
│   └── main.js        # Core JavaScript (247 lines)
├── css/
│   └── style.css      # Custom styles (58 lines)
└── [documentation files]
```

## Key Architecture Decisions

### 1. Static Site - No Build Process
- Pure HTML/CSS/JS - no bundler, no compilation
- All dependencies via CDN (Tailwind CSS, Google Maps)
- Direct deployment to GitHub Pages
- **Never introduce build tools** unless absolutely necessary

### 2. Mobile-First Design
- Responsive breakpoint: 768px (md: in Tailwind)
- Mobile: Single column layout, sticky footer
- Desktop: 2-column grid, normal footer
- **Always test mobile behavior when making UI changes**

### 3. API Architecture
- **Primary**: Geolocation API with `enableHighAccuracy: true`
- **Fallback**: Google Elevation API when altitude is null
- **Sensors**: DeviceOrientation API for pitch/roll
- **Maps**: Google Maps JavaScript API

### 4. Client-Side Only Processing
- No server-side code
- No data storage or persistence
- No cookies or tracking
- Privacy-focused design

## Critical Files

### index.html
- Main application interface
- Contains Google Maps API script tag with API key (line 177)
- Sticky footer element with ID `ad-footer`
- Data section (hidden by default, shown after permissions)

### js/main.js
- API key constant: `GOOGLE_API_KEY` (line 5)
- Entry point: `startMonitoring()` function
- Key functions:
  - `startGeolocation()` - Continuous GPS tracking
  - `fetchElevation()` - Fallback altitude API
  - `startDeviceOrientation()` - Sensor tracking
  - `updateMap()` - Google Maps management

### css/style.css
- Mobile sticky footer positioning
- Custom responsive styles
- Minimal - Tailwind handles most styling

## Coding Conventions

### JavaScript
- Vanilla JS - no frameworks or libraries
- Clear, descriptive function names
- Comprehensive error handling
- Comments for complex logic only
- Use `async/await` for API calls

### HTML
- Semantic HTML5 elements
- Tailwind utility classes for styling
- Responsive mobile menu (hamburger)
- Accessibility attributes (ARIA labels where needed)

### CSS
- Mobile-first media queries
- Tailwind CSS for utility classes
- Custom CSS only for:
  - Mobile sticky footer behavior
  - Animations/transitions
  - Browser-specific fixes

### Styling Guidelines
- **Use Tailwind classes** for all standard styling
- **Never add inline styles** unless absolutely necessary
- **Follow existing color scheme**: gray-900 (bg), gray-800 (cards), blue-400 (accents)
- **Maintain consistency** with existing components

## API Key Management

### Important Security Notes
1. API keys are visible in source code (static site limitation)
2. Security through **Google Cloud Console restrictions**:
   - HTTP referrer restrictions (domain-based)
   - API restrictions (only Maps + Elevation)
3. **Never commit real API keys** to version control
4. Current placeholders: `YOUR_API_KEY` in 2 files

### API Key Locations
1. `index.html` line 177 - Google Maps script tag
2. `js/main.js` line 5 - Elevation API constant

**These must match exactly**

## Making Changes

### When Modifying Features

#### Adding New Sensor Data
1. Add display element to `index.html` data section
2. Create handler function in `main.js`
3. Update About page with feature description
4. Test on mobile and desktop

#### Modifying Layout
1. Use Tailwind classes first
2. Only add custom CSS if Tailwind can't handle it
3. Test responsive behavior at 768px breakpoint
4. Verify mobile sticky footer still works

#### Changing APIs
1. Update Google Cloud Console settings
2. Modify API key restrictions
3. Test error handling
4. Update Privacy Policy if data usage changes

### When Adding Pages
1. Copy navigation from existing HTML file
2. Add link to all navigation menus (desktop + mobile)
3. Use consistent styling (gray-900 bg, gray-800 cards)
4. Test mobile menu functionality

## Common Tasks

### Testing Locally
```bash
# Requires local server for Geolocation API
python -m http.server 8000
# Visit http://localhost:8000
```

### Finding Placeholders Before Deployment
```bash
grep -r "YOUR_API_KEY\|yourusername\|contact@example\.com" \
  --include="*.html" --include="*.js" .
```

### Checking Responsive Design
- Chrome DevTools: Device toolbar (Cmd/Ctrl + Shift + M)
- Test breakpoint: 768px
- Verify sticky footer at mobile sizes

## Browser Compatibility

### Fully Supported
- Chrome/Edge (desktop + mobile)
- Firefox (desktop + mobile)
- Safari (desktop + iOS)

### Special Cases
- **iOS 13+**: Requires explicit DeviceOrientation permission
- **iOS in-app browsers**: May not support all sensors
- **HTTPS required**: For Geolocation + DeviceOrientation APIs

## Known Behavior

### Expected Functionality
1. **Altitude will usually come from Elevation API** - Most devices don't provide GPS altitude
2. **First load requires permissions** - User must click "Start Monitoring"
3. **iOS requires extra permission** - DeviceOrientation needs explicit grant
4. **Map loads after position acquired** - Not immediate

### This is Normal
- Altitude source showing "Google Elevation API" (not GPS)
- ~2-3 second delay before first position update
- Location accuracy varying by environment
- Sensors showing "--" briefly before first reading

## Troubleshooting

### Map Not Loading
- Check API key in both files (must match)
- Verify Maps JavaScript API enabled in Google Cloud
- Check browser console for specific errors
- Ensure domain restrictions allow current URL

### Sensors Not Working
- iOS: Use Safari or Chrome (not in-app browsers)
- Requires HTTPS (GitHub Pages provides this)
- User must grant permission
- Check `DeviceOrientationEvent` support

### Altitude Shows "Unavailable"
- Check Elevation API enabled in Google Cloud
- Verify API key has Elevation API access
- Check network connectivity
- Review browser console for API errors

## Don't Break These

### Critical Elements
1. **Sticky footer on mobile** - Uses `fixed bottom-0` in CSS media query
2. **Permission flow** - Must request permissions before showing data
3. **API fallback logic** - GPS altitude → Elevation API
4. **Map initialization** - Uses callback pattern (`initMap` function)
5. **Mobile menu toggle** - JavaScript event listener required

### Preserve
- Zero build process (no npm, no webpack)
- Client-side only processing
- No data persistence
- Privacy-focused approach
- Accessible design

## Future Enhancement Ideas

If the user wants to add features:
- Altitude history tracking/graphs
- Waypoint saving (localStorage)
- Compass heading (using `alpha` from DeviceOrientation)
- Export data (GPX/KML format)
- PWA features (offline functionality)
- Dark/light theme toggle

**Always maintain**: Static site, no server, client-side only

## Testing Checklist

Before any major changes, verify:
- [ ] Mobile sticky footer works (fixed at bottom)
- [ ] Navigation menu toggles on mobile
- [ ] Permission flow completes successfully
- [ ] Altitude displays (via Elevation API fallback)
- [ ] Map loads and centers on location
- [ ] Sensors work on mobile device
- [ ] All page links work
- [ ] Responsive layout at 768px breakpoint
- [ ] No console errors

## Deployment Requirements

### Before First Deploy
1. Get Google Cloud API key
2. Enable Maps JavaScript API + Elevation API
3. Set up API key restrictions
4. Replace `YOUR_API_KEY` in 2 files
5. Update contact information
6. Test locally

### For Updates
1. Test locally first
2. Commit and push to GitHub
3. Verify deployment at GitHub Pages URL
4. Test live site on mobile device

## API Usage & Costs

### Free Tier (per month)
- Maps JavaScript API: $200 credit (~28,000 loads)
- Elevation API: $200 credit (~28,500 requests)

### Cost Optimization
- API keys restricted to specific domain
- No unnecessary API calls
- Elevation API only called when GPS altitude unavailable
- Maps initialized once per session

### Monitor Usage
- Google Cloud Console → APIs & Services → Dashboard
- Set up billing alerts if expecting high traffic

## Contact Updates

When updating contact information:
- `contact.html` - Email and GitHub links (lines 67, 71, 85, 89, 120, 143)
- `privacy.html` - Contact email (line 256)
- `README.md` - Support email (line 208)

Use find/replace to ensure consistency.

## Special Instructions

### When User Asks to Add Features
1. Confirm feature fits static site model (no server needed)
2. Check if it requires new APIs (update privacy policy)
3. Maintain mobile-first approach
4. Update About page with feature description
5. Update README if setup changes

### When User Reports Bugs
1. Check browser console for errors
2. Verify API keys are configured
3. Test locally with `python -m http.server`
4. Check mobile vs desktop behavior
5. Review error handling in `main.js`

### When User Wants Design Changes
1. Use Tailwind classes when possible
2. Maintain existing color scheme (unless requested to change)
3. Test at 768px breakpoint
4. Preserve mobile sticky footer behavior
5. Keep accessibility in mind

## Version Control

### Commit Message Style
- "Add [feature]" for new functionality
- "Update [component]" for modifications
- "Fix [issue]" for bug fixes
- Include "Co-Authored-By: Claude" if doing git commits

### Branching (if used)
- `main` - production-ready code
- Feature branches optional for this small project

## Summary

This is a **simple, static, privacy-focused** webapp. Keep it that way:
- ✅ No build process
- ✅ No server-side code
- ✅ No data persistence
- ✅ No tracking/analytics
- ✅ Mobile-first design
- ✅ Progressive enhancement

**Core principle**: Everything should work client-side in the browser with minimal complexity.
