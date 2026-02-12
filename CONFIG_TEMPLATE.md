# Configuration Template

This file documents all the places where you need to update configuration values before deploying your Altimeter webapp.

## Required Changes

### 1. Google API Key (REQUIRED)

**File**: `index.html`
**Line**: 177
**Find**:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>
```
**Replace with**:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB_YOUR_ACTUAL_KEY_HERE&callback=initMap" async defer></script>
```

---

**File**: `js/main.js`
**Line**: 5
**Find**:
```javascript
const GOOGLE_API_KEY = 'YOUR_API_KEY';
```
**Replace with**:
```javascript
const GOOGLE_API_KEY = 'AIzaSyB_YOUR_ACTUAL_KEY_HERE';
```

### 2. Contact Information

**File**: `contact.html`
**Lines**: 67, 71
**Find**:
```html
<a href="mailto:contact@example.com" class="text-blue-400 hover:text-blue-300 transition">
    contact@example.com
</a>
```
**Replace with**: Your actual email address

---

**Lines**: 85, 89
**Find**:
```html
<a href="https://github.com/yourusername/altimeter" target="_blank" rel="noopener noreferrer">
    github.com/yourusername/altimeter
</a>
```
**Replace with**: Your actual GitHub repository URL

---

**Line**: 120
**Find**:
```html
<a href="https://github.com/yourusername/altimeter/issues" target="_blank">
```
**Replace with**: Your actual GitHub issues URL

---

**Line**: 143
**Find**:
```html
<a href="https://github.com/yourusername/altimeter" target="_blank">
```
**Replace with**: Your actual GitHub repository URL

### 3. Privacy Policy Contact

**File**: `privacy.html`
**Line**: 256
**Find**:
```html
Email: <a href="mailto:contact@example.com" class="text-blue-400 hover:text-blue-300 transition">contact@example.com</a>
```
**Replace with**: Your actual email address

## Optional Changes

### 4. README Contact Information

**File**: `README.md`
**Line**: 208
**Find**:
```markdown
- Email: contact@example.com (update with your actual email)
```
**Replace with**: Your actual email address

### 5. Ad Integration (Optional)

**File**: `index.html`
**Lines**: 158-162
**Find**:
```html
<footer id="ad-footer" class="bg-gray-800 border-t border-gray-700">
    <div class="container mx-auto px-4 h-16 flex items-center justify-center">
        <div class="text-gray-500 text-sm">Advertisement Space</div>
    </div>
</footer>
```
**Replace with**: Your ad network code (e.g., Google AdSense script)

### 6. Branding/Title (Optional)

If you want to rename the app from "Altimeter" to something else:

**Files to update**:
- `index.html` - Title tag and navigation
- `about.html` - Title tag and navigation
- `contact.html` - Title tag and navigation
- `privacy.html` - Title tag and navigation
- All navigation menus

## Quick Find & Replace Commands

If using command line tools, you can use these commands to help with replacements:

### Replace API Key in all files:
```bash
# macOS/Linux
find . -type f \( -name "*.html" -o -name "*.js" \) -exec sed -i 's/YOUR_API_KEY/AIzaSyB_YOUR_ACTUAL_KEY/g' {} +

# Note: Make a backup first!
```

### Replace email address:
```bash
# macOS/Linux
find . -type f \( -name "*.html" -o -name "*.md" \) -exec sed -i 's/contact@example\.com/youremail@domain.com/g' {} +
```

### Replace GitHub URLs:
```bash
# macOS/Linux
find . -type f \( -name "*.html" -o -name "*.md" \) -exec sed -i 's|github\.com/yourusername/altimeter|github.com/YOURUSERNAME/YOURREPO|g' {} +
```

## Validation Checklist

After making changes, verify:

- [ ] Google API key is correctly set in both `index.html` and `js/main.js`
- [ ] Both API keys match exactly
- [ ] Email addresses are updated in all three HTML pages
- [ ] GitHub URLs point to your actual repository
- [ ] No "YOUR_API_KEY" or "yourusername" placeholders remain
- [ ] No "contact@example.com" placeholders remain

## Search for Remaining Placeholders

Run this command to find any remaining placeholders:

```bash
grep -r "YOUR_API_KEY\|yourusername\|contact@example\.com" --include="*.html" --include="*.js" --include="*.md" .
```

If the command returns any results, those locations still need to be updated.

## Security Note

**NEVER commit your actual API key to a public repository!**

If you accidentally commit an API key:
1. Immediately regenerate the key in Google Cloud Console
2. Update your local files with the new key
3. Add the old key to `.gitignore` patterns
4. Consider using environment variables for API keys in production

For this static site, the API key will be visible in the source code, so make sure to:
- Set up proper API key restrictions in Google Cloud Console
- Limit to your specific domain only
- Monitor usage regularly
- Set up billing alerts
