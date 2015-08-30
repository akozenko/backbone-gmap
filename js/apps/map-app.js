import App from '../app';

import InfoView      from '../components/InfoView/InfoView';
import EditModeView  from '../components/EditModeView/EditModeView';
import ViewModeView  from '../components/ViewModeView/ViewModeView';

import PointsStore from '../stores/PointsStore';
import BaseRouter from '../BaseRouter';

let _isEditable;

class Controller {
   toview() {
      _isEditable = false;

      let view = new ViewModeView({ collection : PointsStore.list() });
      view.render();
      App.mainLayout.content.show(view);

      view.on('toedit', function() {
         App.trigger('mode:edit');
      });

      view.on('childview:remove', function(data) {
         App.trigger('marker:remove', data.model);
      });

      view.on('childview:show', function(data) {
         App.trigger('marker:activate', data.model.getCurrentPosition());
      });
   }

   toedit() {
      _isEditable = true;

      let view = new EditModeView();
      view.render();
      App.mainLayout.content.show(view);

      view.on('toview', function() {
         App.trigger('mode:view');
      });
   }

   topoint(g, k) {
      let model = PointsStore.find(+g, +k);

      let view = new InfoView({model : model});
      view.render();

      App.trigger('info:show', view);

      view.on('marker:remove', (data) => {
         App.trigger('marker:remove', data.model);
      });
   }
};

App.on('map:click', function(position) {
   if (_isEditable) {
      PointsStore.add(position);
   }
});

App.on('login', function() {
   App.addInitializer(function() {
      return new BaseRouter({
         controller  : new Controller(),
         appRoutes   : {
            ''             : 'toview',
            'edit'         : 'toedit',
            'point/:G-:K'  : 'topoint'
         }
      });
   });
});
