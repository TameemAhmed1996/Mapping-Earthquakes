// Check If The Code Is Working.
console.log("working");

// Create The Tile Layer.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create The Satellite Street View Tile Layer.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let baseMaps = {
  Streets: streets,
  Satellite: satelliteStreets
};

// Create The Map Object With Center, Zoom Level And Default Layer.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

// Pass Map Layers Into Layers Control And Add Layers Control To The Map.
L.control.layers(baseMaps).addTo(map);

// Retrieve The Earthquake GeoJSON Data.
let earthquakesPast7Days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grabbing The GeoJSON Data.
d3.json(earthquakesPast7Days).then(function(data) {
  console.log(data);
  // Creating A GeoJSON Layer With The Retrieved Data.
  L.geoJson(data, {
    onEachFeature: function(feature, layer) {
    console.log(layer);
    //layer.bindPopup("<h3>Neighborhood: "+ layer.feature.properties.AREA_NAME + "</h3>");
    }
  }).addTo(map);
});