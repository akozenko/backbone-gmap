import _ from 'underscore';
import Backbone from 'backbone';

export default class MarkerModel extends Backbone.Model {
   constructor(attr, options) {
      super(attr, options);
      this.idAttribute = '_id';
   }
   url() {
      let url = '/api/point';
      if (!this.isNew()) {
         url += '/' + this.get(this.idAttribute);
      }
      return url;
   }
   getCurrentPosition() {
      return _.pick(this.toJSON(), 'lat', 'lng');
   }

   toJSON() {
      return _.omit(this.attributes, 'address');
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
