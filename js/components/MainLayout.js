import _ from 'underscore';
import Marionette from 'backbone.marionette';
import tmpl from './MainLayout.html'

import './MainLayout.less';

const regions = {
   content  : '.aside-content'
};

export default Marionette.LayoutView.extend({
   template : _.template(tmpl),
   regions  : regions
});
