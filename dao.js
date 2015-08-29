var _ = require('underscore');
var storage = [];

function find(id) {
   return _.find(storage, {_id: id});
}

function remove(id) {
   storage = _.without(storage, find(id));
}

function save(point) {
   if ( _.has(point, '_id') ) {
      var stored = find(point._id);
      _.extend(stored, point);
   } else {
      point._id = _.uniqueId('');
      storage.push(point);
   }

   return point;
}

function list() {
   return storage;
}

module.exports = {
   save : save,
   list : list,
   find : find,
   remove : remove
}
