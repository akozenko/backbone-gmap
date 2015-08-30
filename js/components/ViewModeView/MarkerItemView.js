import _ from 'underscore';
import Marionette from 'backbone.marionette';

import tmpl from './MarkerItemView.html'
import './MarkerItemView.less';

export default Marionette.ItemView.extend({
   className: 'marker',
   template : _.template(tmpl),

   triggers : {
      'click button.remove-marker'  : 'remove',
      'click span.marker-text'      : 'show'
   }
})
