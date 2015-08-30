import _ from 'underscore';
import Marionette from 'backbone.marionette';

import ItemView from './MarkerItemView';
import tmpl from './ViewModeView.html';
import nls  from './ViewModeView.json';
import './ViewModeView.less';

export default Marionette.CompositeView.extend({
   className: 'view-mode-view',
   template : _.template(tmpl),
   templateHelpers: nls,
   childView: ItemView,
   childViewContainer: 'ul.markers',
   triggers : {
      'click button.toedit' : 'toedit'
   },

   events   : {
      'click button.toggler'  : 'toggleMarkers'
   },

   ui       : {
      markers : 'ul.markers'
   },

   toggleMarkers: function() {
      this.ui.markers.toggle();
   }
})
