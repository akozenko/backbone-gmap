import _ from 'underscore';
import Marionette from 'backbone.marionette';

import tmpl from './InfoView.html';

import './InfoView.less';

export default Marionette.ItemView.extend({
   initialize  : function() {
      this.model.on('destroy', () => {
         this.remove();
      });
   },
   className   : 'info-view',
   triggers    : {
      'click button.remove' : 'marker:remove'
   },
   template    : _.template(tmpl),
});
