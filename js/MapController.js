import _ from 'underscore';

import app from './app';
import PointsStore from './stores/PointsStore';

let _isEditable;
let map;
let markers = [];

export default class MapController {
   constructor() {
      map = new google.maps.Map(document.querySelector('.map'), {
         center: {lat: 48.28, lng: 35.0105},
         zoom: 10
      });

      map.addListener('click', (e) => {
         app.trigger('map:click', e.latLng);
      });

      PointsStore.list().on('add', _convert2marker);

      _runGeolocation(map);
   }

   showInfoWindow(view) {
      let infowindow = new google.maps.InfoWindow({
         content: view.$el[0]
      });

      let marker = _findMarkerByModel(view.model);

      infowindow.open(map, marker);

      infowindow.addListener('closeclick', () => {
         app.trigger('info:close');
      });
   }

   removeMarker(model) {
      let marker = _findMarkerByModel(model);
      marker.setMap(null);
   }

   clear() {
      // TODO
   }
}

function _findMarkerByModel(model) {
   return _.find(markers, function(m) {
      return m.position.G === +model.get('lat') && m.position.K === +model.get('lng');
   });
}

function _runGeolocation(map) {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
    });
  }
}

function _convert2marker(model) {
   let position = model.getCurrentPosition();
   let marker = new google.maps.Marker({
      position: position,
      map: map,
      title: model.get('title')
   });

   marker.addListener('click', function() {
      app.trigger('marker:activate', {
         lat: +position.lat,
         lng: +position.lng
      });
   });

   markers.push(marker);
}
