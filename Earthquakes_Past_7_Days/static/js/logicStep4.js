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

// Create The Earthquake Layer.
let earthquakes = new L.layerGroup();

// Implement An Object That Contains The Overlays.
let overlays = {
  Earthquakes: earthquakes
};

// Create The Map Object With Center, Zoom Level And Default Layer.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

// Pass Map Layers Into Layers Control And Add Layers Control To The Map.
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve The Earthquake GeoJSON Data.
let earthquakesPast7Days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grabbing The GeoJSON Data.
d3.json(earthquakesPast7Days).then(function(data) {
  console.log(data);
  
  // Return The Style Data For Every Earthquake Plotted On The Map And Pass Magnitudes Of Earthquakes Into A Function To Calculate Radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
       weight: 0.5
    };
  }
  // Determine Color Of The Circle Based On Magnitude Of Earthquakes.
  function getColor(magnitude) {
    if (magnitude > 5) {return "#ea2c2c";}
    if (magnitude > 4) {return "#ea822c";}
    if (magnitude > 3) {return "#ee9c00";}
    if (magnitude > 2) {return "#eecc00";}
    if (magnitude > 2) {return "#d4ee00";}
    return "#98ee00";
  }
  // Determine Radius Of Earthquake Markers Based On Magnitudes.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

  // Creating A GeoJSON Layer With The Retrieved Data.
  L.geoJson(data, {
    // Turn Each Feature Into A Circle Marker On The Map.
    pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
    style: styleInfo,
    onEachFeature: function(feature, layer) {
    layer.bindPopup("Magnitude: "+ layer.feature.properties.mag + "<br>Location: " + layer.feature.properties.place);
    }
  }).addTo(earthquakes);

  // Add Earthquake Layer To The Map.
  earthquakes.addTo(map);
});