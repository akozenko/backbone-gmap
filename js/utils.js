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

export function convertDMS(val) {

   // Required variables
   var valDeg, valMin, valSec, result;

   // Here you'll convert the value received in the parameter to an absolute value.
   // Conversion of negative to positive.
   // In this step it does not matter if it's North, South, East or West,
   // such verification was performed earlier.
   val = Math.abs(val); // -40.601203 = 40.601203

   // ---- Degrees ----
   // Stores the integer of DD for the Degrees value in DMS
   valDeg = Math.floor(val); // 40.601203 = 40

   // Add the degrees value to the result by adding the degrees symbol "º".
   result = valDeg + "º"; // 40º

   // ---- Minutes ----
   // Removing the integer of the initial value you get the decimal portion.
   // Multiply the decimal portion by 60.
   // Math.floor returns an integer discarding the decimal portion.
   // ((40.601203 - 40 = 0.601203) * 60 = 36.07218) = 36
   valMin = Math.floor((val - valDeg) * 60); // 36.07218 = 36

   // Add minutes to the result, adding the symbol minutes "'".
   result += valMin + "'"; // 40º36'

   // ---- Seconds ----
   // To get the value in seconds is required:
   // 1º - removing the degree value to the initial value: 40 - 40.601203 = 0.601203;
   // 2º - convert the value minutes (36') in decimal ( valMin/60 = 0.6) so
   // you can subtract the previous value: 0.601203 - 0.6 = 0.001203;
   // 3º - now that you have the seconds value in decimal,
   // you need to convert it into seconds of degree.
   // To do so multiply this value (0.001203) by 3600, which is
   // the number of seconds in a degree.
   // You get 0.001203 * 3600 = 4.3308
   // As you are using the function Math.round(),
   // which rounds a value to the next unit,
   // you can control the number of decimal places
   // by multiplying by 1000 before Math.round
   // and subsequent division by 1000 after Math.round function.
   // You get 4.3308 * 1000 = 4330.8 -> Math.round = 4331 -> 4331 / 1000 = 4.331
   // In this case the final value will have three decimal places.
   // If you only want two decimal places
   // just replace the value 1000 by 100.
   valSec = Math.round((val - valDeg - valMin / 60) * 3600 * 1000) / 1000; // 40.601203 = 4.331

   // Add the seconds value to the result,
   // adding the seconds symbol " " ".
   result += valSec + '"'; // 40º36'4.331"

   // Returns the resulting string.
   return result;
 }


