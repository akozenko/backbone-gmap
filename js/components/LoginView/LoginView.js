import _ from 'underscore';
import Marionette from 'backbone.marionette';

import tmpl from './LoginView.html';
import nls  from './LoginView.json';
import './LoginView.less';

export default Marionette.ItemView.extend({
   ui : {
      username : 'input.username',
      password : 'input.password'
   },
   className   : 'login-wrapper',
   triggers    : {
      'click button.login' : 'login'
   },
   template    : _.template(tmpl),

   templateHelpers: nls
});
