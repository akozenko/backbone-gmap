import $ from 'jquery';

import BaseRouter from './BaseRouter';

// applications
import applications from './apps/applications';

import App from './app';

function _createAppRouter(app) {
   return new BaseRouter({
      appRoutes   : app.routerHandler,
      controller  : app.API
   });
}

App.addInitializer(function() {
   applications.map(_createAppRouter);
});

$(function() {
//   initMap(document.getElementById('map'));
   App.start();
});
