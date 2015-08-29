import _ from 'underscore';
import Backbone from 'backbone';

import App from '../app';
import InfoView from '../components/InfoView';

import PointsStore from '../stores/PointsStore';

import { serialize, unserialize } from '../utils';

let _isEditable;
let map;

let markers = [];

class Controller {
   toview() {
      App.navigate('');
      _isEditable = false;
   }

   toedit() {
      App.navigate('edit');
      _isEditable = true;
   }

   topoint(g, k) {
      App.navigate('point/' + g + '-' + k);

      var marker = _.find(markers, function(m) {
         return m.position.G === g && m.position.K === k;
      });

      let model = PointsStore.find(+g, +k);

      let view = new InfoView({model : model});
      view.render();
      view.on('marker:remove', (data) => {
         data.model.destroy();
         marker.setMap(null);

         this.toview();
      });

      let infowindow = new google.maps.InfoWindow({
         content: view.$el[0]
      });

      infowindow.open(map, marker);
   }
};

const mapController = new Controller();

App.on('login', function() {
   map = new google.maps.Map(document.querySelector('.map'), {
      center: {lat: 48.28, lng: 35.0105},
      zoom: 10
   });

   map.addListener('click', _addPoint);

   PointsStore.list().on('add', _convert2marker);

   PointsStore.list().each(_convert2marker);

   _runGeolocation(map);
})


function _convert2marker(model) {
   let position = model.getCurrentPosition();
   let marker = new google.maps.Marker({
      position: position,
      map: map,
      title: model.get('title')
   });

   marker.addListener('click', function() {
      mapController.topoint(+position.lat, +position.lng);
   });

   markers.push(marker);
}

function _addPoint(e) {
   if (_isEditable) {
      PointsStore.add(e.latLng);
   }
}

const appRouter = {
   ''             : 'toview',
   'edit'         : 'toedit',
   'point/:G-:K'  : 'topoint'
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

export default {
   API : mapController,
   routerHandler  : appRouter
};

