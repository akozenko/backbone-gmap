import App        from '../app';
import BaseRouter from '../BaseRouter';

import RegistryView  from '../components/RegistryView/RegistryView';
import UsersStore    from '../stores/UsersStore';

class Controller {
   registry() {
      let view = new RegistryView();
      view.render();
      App.mainLayout.content.show(view);

      view.on('registry', () => {
         let username = view.ui.username.val();
         let password = view.ui.password.val();

         UsersStore.registry(username, password);
      });
   }
};

App.addInitializer(function() {
   return new BaseRouter({
      controller  : new Controller(),
      appRoutes   : {
         'registry' : 'registry'
      }
   });
});
