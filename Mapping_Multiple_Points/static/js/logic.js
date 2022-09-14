// Check If The Code Is Working Properly.
console.log("working");

// Create The Map Object With A Center And Zoom Level.
let map = L.map('mapid').setView([40.7, -94.5], 4);

// Get Data From The Cities JS File.
let cityData = cities;

// Loop Through The Cities Array And Create One Marker For Each City.
cityData.forEach(city => {
    console.log(city);
    L.circleMarker(city.location, {
        radius: city.population/200000,
        color: "orange",
        fillColor: "orange",
        fillOpacity: 0.1,
        weight: 3
    })
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
    .addTo(map);
});

// Add A Marker To The Map For Los Angeles, California.
// L.circleMarker([34.0522, -118.2437], {
//    color: "black",
//    fillColor: "lightyellow",
//    fillOpacity: 0.5,
//    radius: 300
// }).addTo(map);

// Create Tile Layer.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create Gray Map Tile Layer.
streets.addTo(map);