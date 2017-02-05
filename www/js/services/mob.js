angular.module('vatFiller')
  .factory('mob', ['gettersetter', function(gettersetter) {
    /**
     * Class that store Mob's information
     * @param {String} name Name of the mob
     * @param {Number} size Number of cows in the mob
     * @param {Number} intake Average intake (in kg DM/day) per cow
     * @param {Object} [options] Options including a model and id.
     * @constructor
     * @memberOf module:'vat.classes'
     */
    function mob(name, size, intake, options) {
      /**
       * Id of the Mob
       */
      this.id = (options && options.hasOwnProperty('id')) ? options.id : 'dsads';
      /**
       * Getter-setter for the 'name' attribute
       * @function
       * @param {String} [newValue] New name
       * @returns Current mob name
       */
      this.name = gettersetter(name);
      /**
       * Getter-setter for the 'size' attribute
       * @function
       * @param {Number} [newValue] New size
       * @returns Current mob size
       */
      this.size = gettersetter(size);
      /**
       * Getter-setter for the 'intake' attribute
       * @function
       * @param {Number} [newValue] New cow daily intake
       * @returns Current cow daily intake
       */
      this.intake = gettersetter(intake);
      if(options && options.hasOwnProperty('model')) {
        /**
         * Model of the average cow (live weight, breed, etc.)
         */
        this.model = options.model;
      } else {
        this.model = {
          lwt: '400 kg',
          breed: "JxF",
          milkProduction: 1.5,
          walkingDistance: 2,
          landSlope: "flat",
          weeksBeforeCalving: "not pregnant",
          weightGain: 0
        };
      }

      /**
       * Returns the mob demand.
       * @returns {number} Total mob demand in kg DM/day
       */
      this.demand = function() {
        return this.size() * this.intake();
      };
      /**
       * Export Mob data as a JSON object
       * @returns {{id: *, name: *, size: *, intake: *, model: *}}
       */
      this._toJSON = function() {
        return {
          id: this.id,
          name: this.name(),
          size: this.size(),
          intake: this.intake(),
          model: this.model
        };
      };
      /**
       * Import data from a Mob stored as a JSON object.
       * @param h Mob as a JSON object
       */
      this._fromJSON = function(h) {
        this.name(h.name);
        this.size(h.size);
        this.intake(h.intake);
        if(h.hasOwnProperty('id')) {
          this.id = h.id;
        }
        if(h.hasOwnProperty('model')) {
          this.model = h.model;
        }
      };
    }
    return mob;
  }]);
