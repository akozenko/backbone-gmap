import _ from 'underscore';
import Marionette from 'backbone.marionette';

import tmpl from './RegistryView.html';
import nls  from './RegistryView.json';
import './RegistryView.less';

export default Marionette.ItemView.extend({
   ui : {
      username : 'input.username',
      password : 'input.password'
   },
   className   : 'registry-wrapper',
   triggers    : {
      'click button.registry' : 'registry'
   },
   template    : _.template(tmpl),

   templateHelpers: nls
});
