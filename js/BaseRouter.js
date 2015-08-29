import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

export default class BaseRouter extends Marionette.AppRouter{
   route(route, name, callback) {
      Backbone.Router.prototype.route.apply(this, arguments);
   }
}
