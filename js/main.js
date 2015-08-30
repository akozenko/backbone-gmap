import $ from 'jquery';

import App from './app';

// apps
import './apps/login-app';
import './apps/registry-app';
import './apps/map-app';

$(function() {
   App.start();
});

$.ajaxSetup({
   statusCode: {
      401: function(){
         App.navigate('login', {trigger : true});
      }
   }
});
