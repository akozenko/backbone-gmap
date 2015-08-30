import _          from 'underscore';
import Backbone   from 'backbone';

import App from '../app';

const SessionModel = Backbone.Model.extend({
   url: '/session',
   isNew: _.constant(false)
});

let session = new SessionModel();

class SessionStore {
   login(username, password) {
      session.set({
         username : username,
         password : password
      });;
      return session.save().then(function() {
         App.navigate('view', {trigger: true});
         App.trigger('login');
      });
   }

   logout() {
      var success = function() {
         session = new SessionModel();
         App.navigate('login', {trigger: true});
      }

      session.destroy({success : success});
   }
}

export default new SessionStore();
