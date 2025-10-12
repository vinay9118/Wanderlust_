// Initialize the map
const rawCoords = listing.geometry?.coordinates;
console.log("Raw coords from DB (lon, lat):", rawCoords);

let coords;

// Validate coordinates: must be array of two numbers [lon, lat]
if (
    Array.isArray(rawCoords) &&
    rawCoords.length === 2 &&
    !isNaN(rawCoords[0]) &&
    !isNaN(rawCoords[1])
) {
    coords = [Number(rawCoords[1]), Number(rawCoords[0])]; // Leaflet expects [lat, lon]
} else {
    console.warn("⚠️ Invalid or missing coordinates. Falling back to default location (Delhi).");
    coords = [28.6139, 77.2090]; // fallback to Delhi
}

// Init map
// let map = L.map("map").setView(coords, 9);
let map = L.map("map", {
    zoomControl: false // This removes the + and - buttons
}).setView(coords, 9);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
}).addTo(map);

// Custom red marker
const redIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Add marker
L.marker(coords, { icon: redIcon }).addTo(map)
    .bindPopup(`
        <h4>${listing.title}</h4>
        <p>Exact Location Provided after booking</p>
    `);
