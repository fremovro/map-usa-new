import Component from '@ember/component';

function defaultStyle() {
  return {
      fillColor: '#FEB24C', weight: 2, opacity: 1, color: 'white', dashArray: '3', fillOpacity: 0.7
  }
}

function fillStyle() {
  return { 
    fillColor: '#FD8D3C', weight: 5, color: '#FC4E2A', dashArray: '', fillOpacity: 0.7 
  }
}

function choseState(lastLayer, chosenLayer, map, info) {
  if(lastLayer) {
    lastLayer.setStyle(defaultStyle());
  }
  lastLayer = chosenLayer;

  chosenLayer.setStyle(fillStyle());
  if (!L.Browser.opera && !L.Browser.edge) {
    chosenLayer.bringToFront();
  }

  map.fitBounds(chosenLayer.getBounds());
  info.update(chosenLayer.feature.properties);

  return lastLayer;
}

export default Component.extend({
  didRender() {
    this._super(...arguments);
    var geojson, lastLayer;

    let features = [];
    this.states.forEach((state) => {
      features.push({ 
        type: "Feature", id: state.id, properties: state.properties, geometry: state.geometry
      })
    });
    var statesData = {
      type: 'FeatureCollection', features: features
    };

    var map = L.map('map').setView([37.8, -96], 4);
    var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    geojson = L.geoJson(statesData, {
      style: defaultStyle,
      onEachFeature: (feature, layer) => {
        layer.on({
          click: (e) => {
            lastLayer = choseState(lastLayer, e.target, map, info);
            document.getElementById("selectStates").value=feature.id;
          },
        });
      }
    }).addTo(map);

    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
        var select = L.DomUtil.create('select', 'info legend');
        select.id="selectStates";
        for(var i = 0; i < features.length; i++){
          select.innerHTML +='<option value=' + features[i].id + '>' + features[i].properties.name + '</option>';
        };
        select.onchange = function() {
          var i = 0, count = 0;
          while(count < features.length) {
            if(geojson._layers[i] != undefined) {
              if(geojson._layers[i].feature.id == select.value) {
                lastLayer = choseState(lastLayer, geojson._layers[i], map, info);
                break;
              }
              count++;
            }
            i++;
          }
        };
        select.selectedIndex=-1;
        return select;
    };
    legend.addTo(map);

    var info = L.control();
    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };
    info.update = function (props) {
        this._div.innerHTML = '<h4>Information about state</h4>' +  
        (props ? '<b>' + props.name + '</b><br />Capital: ' + props.capital + '</b><br />Foundation: ' + props.foundation : 'Hover over a state');
    };
    info.addTo(map);
  }
});
