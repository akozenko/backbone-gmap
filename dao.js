var _ = require('underscore');

var db = {};

function _getStorage(userid) {
   var storage = db[userid];
   if (!storage) {
      storage = db[userid] = [];
   }
   return storage;
}

function find(userid, id) {
   var storage = _getStorage(userid);
   return _.findWhere(storage, {_id: id});
}

function remove(userid, id) {
   var storage = _getStorage(userid);
   db[userid] = _.without(storage, find(userid, id));
}

function save(userid, point) {
   if ( _.has(point, '_id') ) {
      var stored = find(userid, point._id);
      _.extend(stored, point);
   } else {
      point._id = _.uniqueId('');
      var storage = _getStorage(userid);
      storage.push(point);
   }

   return point;
}

function list(userid) {
   return _getStorage(userid);
}

module.exports = {
   save : save,
   list : list,
   find : find,
   remove : remove
}
