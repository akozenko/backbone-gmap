import _ from 'underscore';

export function serialize(obj) {
   return _.map(obj, _serializePair).join("&");

   function _serializePair(value, key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(value);
   }
}

export function unserialize(query) {
   return query.split('&').reduce(_unserializePair, {});

   function _unserializePair(memo, str) {
      var pair = str.split('=');
      memo[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      return memo;
   }
}
