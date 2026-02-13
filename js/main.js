// Global variables
let map;
let marker;
let watchId;
const GOOGLE_API_KEY = 'AIzaSyBA63oPOnr6kCtiTUwnllBtz5j6IeCL_5U'; // Replace with actual API key

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    const startButton = document.getElementById('start-button');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (startButton) {
        startButton.addEventListener('click', startMonitoring);
    }

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Start monitoring sensors and location
async function startMonitoring() {
    const permissionSection = document.getElementById('permission-section');
    const dataSection = document.getElementById('data-section');
    const statusElement = document.getElementById('permission-status');

    try {
        statusElement.textContent = 'Requesting permissions...';


        // Request geolocation permission and start watching
        if ('geolocation' in navigator) {
            statusElement.textContent = 'Requesting location permission...';
            startGeolocation();
        } else {
            throw new Error('Geolocation is not supported by your browser');
        }


        // Hide permission section and show data section
        permissionSection.classList.add('hidden');
        dataSection.classList.remove('hidden');

    } catch (error) {
        statusElement.textContent = `Error: ${error.message}`;
        statusElement.classList.add('text-red-400');
        console.error('Permission error:', error);
    }
}

// Start geolocation tracking
function startGeolocation() {
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };

    // watchId = navigator.geolocation.watchPosition(
    //     handlePositionSuccess,
    //     handlePositionError,
    //     options
    // );

    // navigator.geolocation.getCurrentPosition only fires once
    navigator.geolocation.getCurrentPosition(
        handlePositionSuccess,
        handlePositionError,
        options
    );
}

// Handle successful position update
function handlePositionSuccess(position) {
    console.log(position);
    const { latitude, longitude, altitude, accuracy, altitudeAccuracy } = position.coords;
    // Update coordinates display
    document.getElementById('latitude-value').textContent = latitude.toFixed(6);
    document.getElementById('longitude-value').textContent = longitude.toFixed(6);
    

    // Update or initialize map
    updateMap(latitude, longitude);

    // Handle altitude
    if (altitude !== null && altitude !== undefined) {
        // GPS altitude available

        const altitudeMeters = altitude.toFixed(2);
        const altitudeFeet = Math.round(altitude * 3.28084);
        document.getElementById('altitude-value').textContent = `${altitudeMeters}m / ${altitudeFeet}ft`;
        document.getElementById('altitude-source').textContent = 'Source: GPS';

        if (altitudeAccuracy) {
            document.getElementById('altitude-accuracy').textContent = `Accuracy: ±${Math.round(altitudeAccuracy)}m`;
        } else {
            document.getElementById('altitude-accuracy').textContent = '';
        }
    } else {
        // Fallback to Google Elevation API

        document.getElementById('altitude-source').textContent = 'GPS altitude unavailable, fetching from Elevation API...';
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

// Fetch elevation from Google Elevation API
async function fetchElevation(latitude, longitude) {
    // Initialize the Google Elevation Service
    const elevator = new google.maps.ElevationService();

    try {
        // We wrap the callback-based Google API in a Promise to keep your async/await flow
        const result = await new Promise((resolve, reject) => {
            elevator.getElevationForLocations({
                'locations': [{ lat: parseFloat(latitude), lng: parseFloat(longitude) }]
            }, (results, status) => {
                if (status === 'OK') {
                    resolve(results[0]);
                } else {
                    reject(new Error('Elevation service failed: ' + status));
                }
            });
        });

        if (result) {
            const elevation = result.elevation;
            const altitudeMeters = Math.round(elevation);
            const altitudeFeet = Math.round(elevation * 3.28084);

            document.getElementById('altitude-value').textContent = `${altitudeMeters}m / ${altitudeFeet}ft`;
            document.getElementById('altitude-source').textContent = 'Source: Google Elevation API';
            document.getElementById('altitude-accuracy').textContent = 'Based on terrain data';
            document.getElementById('altitude-updateTime').textContent = new Date().toLocaleTimeString();
        }
    } catch (error) {
        document.getElementById('altitude-value').textContent = 'Error';
        document.getElementById('altitude-source').textContent = 'Failed to fetch elevation data';
        document.getElementById('altitude-accuracy').textContent = '';
        console.error('Elevation API error:', error);
    }
}



// Initialize Google Map (callback function)
function initMap() {
    // Map will be initialized when position is first received
    console.log('Google Maps API loaded');
}

// Update or create map
function updateMap(latitude, longitude) {
    const position = { lat: latitude, lng: longitude };

    if (!map) {
        // Initialize map
        map = new google.maps.Map(document.getElementById('map'), {
            center: position,
            zoom: 15,
            mapTypeId: 'terrain',
            disableDefaultUI: true,
            mapCameraControl:false,
        });

        // Create marker
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: 'Your Location',
            animation: google.maps.Animation.DROP
        });
    } else {
        // Update existing map and marker
        map.setCenter(position);
        marker.setPosition(position);
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

// Make initMap available globally for Google Maps callback
window.initMap = initMap;
