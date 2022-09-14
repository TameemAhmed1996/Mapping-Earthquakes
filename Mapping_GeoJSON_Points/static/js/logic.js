// Check If The Code Is Working.
console.log("working");

// Add GeoJSON Data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// Create The Map Object With Center At The San Francisco Airport.
//let map = L.map('mapid').setView([37.5, -122.5], 10);
//let map = L.map('mapid').setView([30, 30], 2);

// Grabbing GeoJSON Data.
//L.geoJSON(sanFranAirport).addTo(map);
/* L.geoJSON(sanFranAirport, {
  // We turn each feature into a marker on the map.
  pointToLayer: function(feature, latlng) {
    console.log(feature);
    return L.marker(latlng)
    .bindPopup("<h2>"+ feature.properties.name + "</h2><hr><h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>");
  }
}).addTo(map); */

/*L.geoJSON(sanFranAirport, {
  // Turn Each Feature Into A Marker On The Map.
  onEachFeature: function(feature, layer) {
    console.log(layer);
     layer.bindPopup("<h3>Airport code: "+ layer.feature.properties.faa + "</h3><hr><h3>Airport name: " + layer.feature.properties.name + "</h3>");
  }
}).addTo(map); */

// Create Tile Layer.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create Gray Map Tile Layer.
//streets.addTo(map);

// Create Dark View Tile Layer.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let baseMaps = {
  Streets: streets,
  Dark: dark
};

// Create The Map Object With Center, Zoom Level, And Default Layer.
let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
});

// Pass Map Layers Into Layers Control And Add Layers Control To The Map.
L.control.layers(baseMaps).addTo(map);

