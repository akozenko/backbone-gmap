import Backbone from 'backbone';

import MarkerModel from './MarkerModel';

const Collection = Backbone.Collection.extend({
   url: '/api/point',
   model: MarkerModel
});

const collection = new Collection();

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
}

export default new PointsStore();
