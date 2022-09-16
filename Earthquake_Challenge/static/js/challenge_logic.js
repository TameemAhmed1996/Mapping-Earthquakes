// Check If The Code Is Working.
console.log("working");

// Create The First Tile Layer.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

//  Create The Second Street View Tile Layer.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create The Third Tile Layer.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create The Map Object With Center, Zoom Level And Default Layer.
let map = L.map('mapid', {
	center: [40.7, -94.5],
	zoom: 3,
	layers: [streets]
});

// Create The Base Layer That Will Store All Three Maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Dark": dark
};

// Add A 2nd Layer Group For The Tectonic Plates Data.
let allEarthquakes = new L.LayerGroup();
let tectonicPlates = new L.LayerGroup();
let majorEarthquakes = new L.LayerGroup();

// Add A Reference To The Tectonic Plates Group Into Overlays.
let overlays = {
  "Earthquakes": allEarthquakes,
  "Tectonic Plates": tectonicPlates,
  "Major Earthquakes": majorEarthquakes
};

// Add A Control To The Map That Enables Modifications For Displaying Which Layers Are Visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve The All Week Earthquake GeoJSON Data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

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
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
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
    // Set The Style For Each Circle Marker.
  style: styleInfo,
   // Create A Pop Up For Each Circle Marker To Display Magnitudes And Locations Of Earthquakes.
   onEachFeature: function(feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
  }
}).addTo(allEarthquakes);

// Add Earthquake Layer To The Map.
allEarthquakes.addTo(map);

// Retrieve The Major 4.5 Week Earthquake GeoJSON Data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then(function(data) {

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
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
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
    return L.circleMarker(latlng);
  },
  style: styleInfo,
  onEachFeature: function(feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
  }
}).addTo(majorEarthquakes);
// Add Major Earthquakes Layer To The Map.
majorEarthquakes.addTo(map);
});

// Create Legend Control.
let legend = L.control({
  position: "bottomright"
});

// Add All Details For The Legend.
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ];

// Loop Through Density Intervals And Generate A Label With A Colored Square For Each Interval.
  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
  };

// Add Legend To The Map.
legend.addTo(map);


// Use D3.JSON To Make A Call For Obtaining The Tectonic Plate GeoJSON Data.
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then((data) => {
    console.log(data);  
    L.geoJson(data, {
      style: {color: "#703606", weight: 3},
    }).addTo(tectonicPlates); 
  });

  // Add Tectonic Plates Layer To The Map.
  tectonicPlates.addTo(map);
});