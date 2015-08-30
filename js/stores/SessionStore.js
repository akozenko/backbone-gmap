import Backbone from 'backbone';

import App from '../app';

const SessionModel = Backbone.Model.extend({
   url: '/session'
});

let session = new SessionModel();

class SessionStore {
   login(username, password) {
      session.set({
         username : username,
         password : password
      });;
      return session.save().then(function() {
         App.trigger('login');
         App.navigate('view', {trigger: true});
      });
   }

   logout() {
      session.destroy();
      session = new SessionModel();
   }
}

export default new SessionStore();
