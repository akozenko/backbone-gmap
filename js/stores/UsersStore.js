import _          from 'underscore';
import Backbone   from 'backbone';

import App from '../app';

const UserModel = Backbone.Model.extend({
   url: '/user'
});

class UsersStore {
   registry(username, password) {
      let user = new UserModel();
      user.set({
         name : username,
         pass : password
      });
      return user.save().then(function() {
         App.navigate('login', {trigger: true});
      });
   }
}

export default new UsersStore();
