import _ from 'underscore';
import Backbone from 'backbone';

export default class MarkerModel extends Backbone.Model {
   getCurrentPosition() {
      return _.pick(this.toJSON(), 'lat', 'lng');
   }
};

MarkerModel.fromPoint = function fromPoint(point) {
   const marker = new MarkerModel({
      lat: +point.G,
      lng: +point.K
   });
   return marker;
};


// export default MarkerModel;
