angular.module('vatFiller')

/**
 * @function GetterSetterFactory
 * @description
 * Function that generates a getter-setter method with a private attribute.
 * @param defaultValue Default value of the private attribute.
 * @returns {Function} A getter-setter method that
 * returns the private attributes if called with no parameter (or the first parameter is undefined);
 * or sets the private attribute to the first parameter if called with a parameter.
 */
  .factory('gettersetter', function() {
    return function(defaultValue) {
      var privateAttribute = defaultValue;
      return function(val) {
        return angular.isDefined(val)?(privateAttribute = val):privateAttribute;
      };
    };
  });
