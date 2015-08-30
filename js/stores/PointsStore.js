import Backbone from 'backbone';

import MarkerModel from './MarkerModel';

const Collection = Backbone.Collection.extend({
   url: '/api/point',
   model: MarkerModel
});

let collection = new Collection();

class PointsStore {
   list() {
      return collection;
   }

   add(point) {
      var model = MarkerModel.fromPoint(point);
      collection.add(model);
      model.save();
   }

   find(lat, lng) {
      return collection.findWhere({
         lat: lat,
         lng: lng
      });
   }

   fetch() {
      return collection.fetch();
   }

   empty() {
      collection = new Collection();
   }
}

export default new PointsStore();
