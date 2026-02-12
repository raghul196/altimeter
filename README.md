# Altimeter Webapp

A real-time altitude tracking web application with inclinometer and location mapping features. Designed for mobile-first usage with GitHub Pages deployment support.

## Features

- **Real-time Altitude Tracking**: GPS altitude with automatic fallback to Google Elevation API
- **Inclinometer**: Device pitch and roll measurements using DeviceOrientation API
- **Interactive Map**: Google Maps integration showing your current location
- **Coordinates Display**: Precise latitude/longitude with accuracy information
- **Mobile-Optimized**: Responsive design with sticky ad container on mobile
- **Privacy-Focused**: All processing happens client-side, no data storage

## Quick Start

### 1. Get a Google API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Elevation API
4. Create credentials (API Key)
5. Restrict your API key:
   - **Application restrictions**: HTTP referrers
   - Add your domain (e.g., `https://yourusername.github.io/altimeter_2/*`)
   - **API restrictions**: Restrict to Maps JavaScript API and Elevation API

### 2. Configure the Application

Replace `YOUR_API_KEY` in two locations:

**In `index.html` (line 177):**
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>
```

**In `js/main.js` (line 5):**
```javascript
const GOOGLE_API_KEY = 'YOUR_API_KEY';
```

### 3. Deploy to GitHub Pages

1. Create a new repository on GitHub (or use existing)
2. Push this code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Altimeter webapp"
   git branch -M main
   git remote add origin https://github.com/yourusername/altimeter_2.git
   git push -u origin main
   ```
3. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to Pages section
   - Select `main` branch and `/ (root)` folder
   - Save and wait for deployment

4. Access your app at: `https://yourusername.github.io/altimeter_2/`

### 4. Local Testing

To test locally, you'll need a local server (required for geolocation API):

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
npx http-server
```

Then open `http://localhost:8000` in your browser.

**Important**: HTTPS is required for geolocation and device orientation APIs. Local testing with `http://localhost` works, but deployed versions must use HTTPS (GitHub Pages provides this automatically).

## Browser Compatibility

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari/iOS**: Full support (requires user permission for DeviceOrientation on iOS 13+)
- **Android browsers**: Full support

## File Structure

```
altimeter_2/
├── index.html          # Main application page
├── about.html          # About page
├── contact.html        # Contact page
├── privacy.html        # Privacy policy
├── js/
│   └── main.js        # Core JavaScript functionality
├── css/
│   └── style.css      # Custom styles
└── README.md          # This file
```

## Customization

### Contact Information

Update the following files with your actual contact information:
- `contact.html`: Email and GitHub links
- `privacy.html`: Contact email

### Styling

The app uses Tailwind CSS via CDN. Custom styles are in `css/style.css`. Modify as needed for:
- Color scheme
- Mobile footer behavior
- Responsive breakpoints

### Ad Integration

The mobile sticky footer is located in `index.html`:
```html
<footer id="ad-footer" class="bg-gray-800 border-t border-gray-700">
    <div class="container mx-auto px-4 h-16 flex items-center justify-center">
        <div class="text-gray-500 text-sm">Advertisement Space</div>
    </div>
</footer>
```

Replace the placeholder with your ad network code (e.g., Google AdSense).

## API Usage and Costs

### Google Maps JavaScript API
- Free tier: $200/month credit (≈28,000 map loads)
- Pricing: $7 per 1,000 loads after free tier

### Elevation API
- Free tier: $200/month credit (≈28,500 requests)
- Pricing: $5 per 1,000 requests after free tier

**Cost optimization tips:**
- Implement API key restrictions in Google Cloud Console
- Cache elevation results if implementing history features
- Consider rate limiting for high-traffic scenarios

## Troubleshooting

### Altitude shows as "Unavailable"
- Most mobile devices don't provide GPS altitude
- The app automatically falls back to Google Elevation API
- Ensure your API key is correctly configured

### DeviceOrientation not working on iOS
- iOS 13+ requires explicit permission
- User must click "Allow" when prompted
- Use Safari or Chrome (in-app browsers may not work)

### Map not loading
- Check that Google Maps API key is correctly set
- Verify Maps JavaScript API is enabled in Google Cloud Console
- Check browser console for specific error messages
- Ensure API key restrictions allow your domain

### Location permission denied
- User must grant location permission in browser
- On iOS: Settings > Safari > Location Services
- On Android: Site settings in browser menu

## Privacy

This app is privacy-focused:
- All processing happens client-side in the browser
- No data is stored or transmitted to any servers (except Google APIs for maps/elevation)
- No cookies or tracking
- No analytics or user identification
- See `privacy.html` for full privacy policy

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - feel free to use and modify as needed.

## Credits

- Built with vanilla JavaScript (no frameworks)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Maps powered by [Google Maps API](https://developers.google.com/maps)
- Elevation data from [Google Elevation API](https://developers.google.com/maps/documentation/elevation)

## Support

For questions or issues:
- Open an issue on GitHub
- Email: contact@example.com (update with your actual email)
