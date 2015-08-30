import _ from 'underscore';
import Marionette from 'backbone.marionette';

import tmpl from './MarkerItemView.html'
import nls  from './MarkerItemView.json'
import './MarkerItemView.less';

export default Marionette.ItemView.extend({
   initialize  : function() {
      this.address = this.model.get('address') || '';

      this.listenTo(this.model, 'change:address', () => {
         this.address = this.model.get('address');
         this.render();
      });
   },

   templateHelpers: function() {
      return _.extend({
         address     : this.address
      }, nls)
   },

   className: 'marker',
   template : _.template(tmpl),

   triggers : {
      'click button.remove-marker'  : 'marker:remove',
      'click span.marker-text'      : 'marker:show'
   }
})
