import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import MainLayout from './components/MainLayout';
import PointsStore from './stores/PointsStore';
import MapController from './MapController';

let App = new Marionette.Application();
let mapController;

App.navigate = function(route,  options) {
   options || (options = {});
   Backbone.history.navigate(route, options);
};

App.on('start', function() {
   App.mainLayout = new MainLayout({ el : $('body')});
   App.mainLayout.render();

   mapController = new MapController();

   App.trigger('login');

   App.on('info:show', mapController.showInfoWindow);
   Backbone.history.start({ pushState: true });
});

      // App.trigger('login');
App.on('login', function() {
   PointsStore.fetch().then(function(list) {
      // Backbone.history.start({ pushState: true });
   });
});

App.on('marker:remove', function(model) {
   mapController.removeMarker(model);
   model.destroy();
   App.trigger('mode:view');
});

App.on('info:close', function() {
   App.trigger('mode:view');
});

App.on('marker:activate', function(position) {
   App.navigate('/point/' + position.lat + '-' + position.lng, {trigger: true});
});

App.on('mode:edit', function() {
   App.navigate('/edit', {trigger: true});
});

App.on('mode:view', function() {
   App.navigate('view', {trigger: true});
});

export default App;
