import _ from 'underscore';
import Marionette from 'backbone.marionette';

import itemTmpl from './PointListItemView.html';

import './PointList.less';

class ItemView extends Marionette.ItemView {
   tagName: 'li',
   template: itemTmpl,
   events: {
      'click button.remove': '_removePoint'
   },
   _removePoint: function() {
      this.model.destroy();
   }
});

export default class PointList extends Marionette.CompositeView {
   tagName: 'ul',
   className: '',
//   template: listTmpl
   childView: ItemView

   collectionEvents: {
      'select:none': 'onDeselect',
      'select:all':  'onSelectAll',
      'select:some': 'onSelectSome'
   }

};