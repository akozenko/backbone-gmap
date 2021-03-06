import App        from '../app';
import BaseRouter from '../BaseRouter';

import LoginView  from '../components/LoginView/LoginView';
import SessionStore from '../stores/SessionStore';

class Controller {
   tologin() {
      let view = new LoginView();
      view.render();
      App.mainLayout.content.show(view);

      view.on('login', () => {
         let username = view.ui.username.val();
         let password = view.ui.password.val();

         SessionStore.login(username, password);
      });

      view.on('registry', () => {
         App.trigger('registry');
      });
   }
};

App.addInitializer(function() {
   return new BaseRouter({
      controller  : new Controller(),
      appRoutes   : {
         'login' : 'tologin'
      }
   });
});
