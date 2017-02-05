angular.module('vatFiller')
  .factory('supplement', ['gettersetter', 'wastage', function(gettersetter, wastage) {
    /**
     * Class that stores information about a Supplement and its use.
     * @param name
     * @param [qual]
     * @param [propDM]
     * @param [density]
     * @param [util]
     * @constructor
     * @memberOf module:'vat.classes'
     */
    function supplement(name, qual, propDM, density, util) {
      this.name = gettersetter(name);
      this.quality = gettersetter(qual || 11);
      this.qtt = gettersetter(0);
      this.propDM = gettersetter(propDM || 1);
      this.density = gettersetter(density || 1);
      // using Wastage service to calculate
      //this._utilisation = util || 0.85;
      // read-only
      this.utilisation = function() {
        return (1 - wastage.supplement()/100);
      };
      this._toJSON = function() {
        return {
          name: this.name(),
          quality: this.quality(),
          qtt: this.qtt(),
          propDM: this.propDM(),
          density: this.density()
        };
      };
    }
    return supplement;

  }]);
