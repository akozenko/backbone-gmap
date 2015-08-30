import _ from 'underscore';
import Marionette from 'backbone.marionette';

import tmpl from './EditModeView.html'
import './EditModeView.less';

export default Marionette.ItemView.extend({
   className: 'edit-mode-view',
   template : _.template(tmpl),
   triggers : {
      'click button.toview' : 'toview'
   }
})
