import _ from 'underscore';
import Marionette from 'backbone.marionette';

import { convertDMS } from '../../utils';

import tmpl from './InfoView.html';
import nls  from './InfoView.json';
import './InfoView.less';

export default Marionette.ItemView.extend({
   initialize  : function() {
      this.address = this.model.get('address') || '';

      this.listenTo(this.model, 'destroy', () => {
         this.remove();
      });

      this.listenTo(this.model, 'change:address', () => {
         this.address = this.model.get('address');
         this.render();
      });
   },

   templateHelpers: function() {
      return _.extend({
         convertDMS  : convertDMS,
         address     : this.address
      }, nls)
   },

   className   : 'info-view',
   triggers    : {
      'click button.remove' : 'marker:remove'
   },
   template    : _.template(tmpl),
});
