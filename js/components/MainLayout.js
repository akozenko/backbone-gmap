import $ from 'jquery';
import _ from 'underscore';
import Marionette from 'backbone.marionette';
import tmpl from './MainLayout.html'

import './MainLayout.less';

const regions = {
   content  : '.content'
};

export default Marionette.LayoutView.extend({
   template : _.template(tmpl),
   triggers : {
      'click button.toedit' : 'mode:edit'
   },
   regions  : regions
});
