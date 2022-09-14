// A Check To See If The Code Is Working Properly.
console.log("working");

// Create The Map Object With A Center And Zoom Level.
let map = L.map('mapid').setView([40.7, -94.5], 4);

// Coordinates For Each Point In The Line.
let line = [
    [37.6213, -122.3790],
    [30.1900, -97.6687],
    [43.67771760000001, -79.62481969999999],
    [40.6413111, -73.7781391]
  ];

// Create A Polyline.
L.polyline(line, {
    color: "blue",
    weight: 2,
    dashArray: "4"
  }).addTo(map);

// Create The Tile Layer.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create The Gray Map Layer.
streets.addTo(map);