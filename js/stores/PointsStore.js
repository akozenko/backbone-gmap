import Backbone from 'backbone';

import MarkerModel from './MarkerModel';

class Collection extends Backbone.Collection {
   model: MarkerModel
   sync() {
      console.log(arguments);
   }
}

const collection = new Collection();

class PointsStore {
   list() {
      return collection;
   }

   add(point) {
      collection.add(MarkerModel.fromPoint(point));
   }

   find(lat, lng) {
      return collection.findWhere({
         lat: lat,
         lng: lng
      });
   }
}

export default new PointsStore();
