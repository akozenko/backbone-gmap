import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import MainLayout from './components/MainLayout';

var App = new Marionette.Application();

App.navigate = function(route,  options) {
   options || (options = {});
   Backbone.history.navigate(route, options);
};

App.on('start', function() {
   App.mainLayout = new MainLayout({ el : $('body')});
   App.mainLayout.render();

   App.mainLayout.on('mode:edit', function() {
      App.navigate('edit', { trigger : true });
   });

   Backbone.history.start({ pushState: true });

   App.trigger('login');
});

export default App;
