// Global variables
let map;
let marker;
let watchId;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

// Debounce function to limit API calls
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Setup event listeners
function setupEventListeners() {
    const addressSubmitButton = document.getElementById('address-submit-button');
    const gpsButton = document.getElementById('gps-button');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const addressInput = document.getElementById('address-input');
    const suggestionsBox = document.getElementById('suggestions-box');

    if (addressSubmitButton) {
        addressSubmitButton.addEventListener('click', geocodeAddress);
    }
    if (gpsButton) {
        gpsButton.addEventListener('click', startGeolocation);
    }
    if (addressInput) {
        addressInput.addEventListener('input', debounce(handleAddressInput, 300));
    }

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Hide suggestions when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.address-bar')) {
            suggestionsBox.classList.add('hidden');
        }
    });
}

// Handle address input for suggestions
async function handleAddressInput() {
    const address = document.getElementById('address-input').value;
    const suggestionsBox = document.getElementById('suggestions-box');

    if (address.length < 3) {
        suggestionsBox.classList.add('hidden');
        return;
    }

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=5`);
        const data = await response.json();
        displaySuggestions(data);
    } catch (error) {
        console.error('Suggestion fetch error:', error);
        suggestionsBox.classList.add('hidden');
    }
}

// Display address suggestions
function displaySuggestions(suggestions) {
    const suggestionsBox = document.getElementById('suggestions-box');
    suggestionsBox.innerHTML = '';

    if (suggestions.length === 0) {
        suggestionsBox.classList.add('hidden');
        return;
    }

    suggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.textContent = suggestion.display_name;
        suggestionItem.addEventListener('click', () => {
            document.getElementById('address-input').value = suggestion.display_name;
            suggestionsBox.classList.add('hidden');
            geocodeAddress();
        });
        suggestionsBox.appendChild(suggestionItem);
    });

    suggestionsBox.classList.remove('hidden');
}


// Geocode address and fetch elevation
async function geocodeAddress() {
    stopGeolocation(); // Stoping gps watch
    const address = document.getElementById('address-input').value;
    const suggestionsBox = document.getElementById('suggestions-box');
    suggestionsBox.classList.add('hidden');
    
    if (!address) {
        showError("Please enter an address.");
        return;
    }

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await response.json();

        if (data && data.length > 0) {
            const latitude = parseFloat(data[0].lat);
            const longitude = parseFloat(data[0].lon);
            
            document.getElementById('latitude-value').textContent = latitude.toFixed(6);
            document.getElementById('longitude-value').textContent = longitude.toFixed(6);

            updateMap(latitude, longitude);

            fetchElevation(latitude, longitude);
            hideError();

        } else {
            showError('Address not found.');
        }
    } catch (error) {
        showError('Error during geocoding.');
        console.error('Geocoding error:', error);
    }
}


// Start geolocation tracking
function startGeolocation() {
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };

    // navigator.geolocation.getCurrentPosition only fires once

    // navigator.geolocation.getCurrentPosition(
    //     handlePositionSuccess,
    //     handlePositionError,
    //     options
    // );
    watchId = navigator.geolocation.watchPosition(
        handlePositionSuccess,
        handlePositionError,
        options
    );
}
function stopGeolocation() {
    if (watchId !== null) {
        console.log('clearing watch')
        // 3. Use clearWatch to stop tracking
        navigator.geolocation.clearWatch(watchId);
        
        // 4. Reset the ID to null so we know it's stopped
        geolocationWatchId = null;

    } 
}

// Reverse geocode coordinates to get an address
async function reverseGeocode(latitude, longitude) {
    try {
        const addressInput = document.getElementById('address-input');
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await response.json();
        if (data && data.display_name ) {
            if (document.activeElement !== addressInput) {
                document.getElementById('address-input').value = data.display_name;
            }
            
        }
    } catch (error) {
        console.error('Reverse geocoding error:', error);
    }
}

// Handle successful position update
function handlePositionSuccess(position) {

    const { latitude, longitude, altitude, accuracy, altitudeAccuracy } = position.coords;
    // Update coordinates display
    document.getElementById('latitude-value').textContent = latitude.toFixed(6);
    document.getElementById('longitude-value').textContent = longitude.toFixed(6);
    
    // Reverse geocode to fill address bar
    reverseGeocode(latitude, longitude);

    // Update or initialize map
    updateMap(latitude, longitude);

    // Handle altitude
    if (altitude !== null && altitude !== undefined) {
        // GPS altitude available

        const altitudeMeters = altitude.toFixed(2);
        const altitudeFeet = Math.round(altitude * 3.28084);
        document.getElementById('altitude-value').textContent = `${altitudeMeters}m / ${altitudeFeet}ft`;
        document.getElementById('altitude-source').textContent = 'GPS';

    } else {
        // Fallback to API
        fetchElevation(latitude, longitude);
    }

    // Clear any error displays
    hideError();
}

// Handle position errors
function handlePositionError(error) {
    let errorMessage = '';

    switch(error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access in your browser settings.';
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable. Please check your GPS settings.';
            break;
        case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.';
            break;
        default:
            errorMessage = 'An unknown error occurred while getting your location.';
            break;
    }

    showError(errorMessage);
    console.error('Geolocation error:', error);
}

// Fetch elevation from Open Elevation API
async function fetchElevation(latitude, longitude) {
    try {
        const response = await fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${latitude},${longitude}`);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            const elevation = data.results[0].elevation;
            const altitudeMeters = Math.round(elevation);
            const altitudeFeet = Math.round(elevation * 3.28084);

            document.getElementById('altitude-value').textContent = `${altitudeMeters}m / ${altitudeFeet}ft`;
            document.getElementById('altitude-source').textContent = 'Open-Elevation';
            document.getElementById('altitude-updateTime').textContent = new Date().toLocaleTimeString();
        } else {
            throw new Error("No elevation data returned");
        }
    } catch (error) {
        document.getElementById('altitude-value').textContent = 'Error';
        document.getElementById('altitude-source').textContent = 'Failed to fetch elevation data';
        console.error('Elevation API error:', error);
    }
}

// Update or create map using Leaflet
function updateMap(latitude, longitude) {
    const position = [latitude, longitude];

    if (!map) {
        // Initialize map
        map = L.map('map').setView(position, 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Create marker
        marker = L.marker(position).addTo(map)
            .bindPopup('Your Location')
            .openPopup();
    } else {
        // Update existing map and marker
        map.setView(position, map.getZoom(), {
            animate: true,
            pan: {
                duration: 1
            }
        });
        marker.setLatLng(position);
    }
}

// Show error message
function showError(message) {
    const errorDisplay = document.getElementById('error-display');
    const errorMessage = document.getElementById('error-message');

    if (errorDisplay && errorMessage) {
        errorMessage.textContent = message;
        errorDisplay.classList.remove('hidden');
    }
}

// Hide error message
function hideError() {
    const errorDisplay = document.getElementById('error-display');
    if (errorDisplay) {
        errorDisplay.classList.add('hidden');
    }
}

// Stop watching position when page unloads
window.addEventListener('beforeunload', function() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
    }
});
