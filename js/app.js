import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import MainLayout from './components/MainLayout';
import PointsStore from './stores/PointsStore';
import SessionStore from './stores/SessionStore';
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

   App.mainLayout.on('logout', function() {
      mapController.empty();
      PointsStore.empty();
      SessionStore.logout();
      PointsStore.list().on('add', mapController.onAddMarker);
   });

   mapController = new MapController();
   PointsStore.list().on('add', mapController.onAddMarker);

   App.trigger('login');

   App.on('info:show', mapController.showInfoWindow);
   Backbone.history.start({ pushState: true });
});

App.on('login', function() {
   let fragment = Backbone.history.location.pathname;
   PointsStore.fetch().then(function() {
      App.navigate(fragment, {trigger: true});
   });
});

App.on('registry', () => {
   App.navigate('registry', {trigger: true});
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
   mapController.hideInfoWindow();
   App.navigate('/edit', {trigger: true});
});

App.on('mode:view', function() {
   mapController.hideInfoWindow();
   App.navigate('view', {trigger: true});
});

export default App;
