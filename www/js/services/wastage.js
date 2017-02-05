angular.module('vatFiller')
  .factory('wastage', ['gettersetter', function(gettersetter) {
    function wastage() {
      /**
       * Getter-setter for the 'pasture' attribute
       * @function
       * @param {Number} [newValue] New value for the pasture wastage
       * @returns Current pasture wastage value
       */
      this.pasture = gettersetter(0);
      /**
       * Getter-setter for the 'supplement' attribute
       * @function
       * @param {Number} [newValue] New value for the supplement wastage
       * @returns Current supplement wastage value
       */
      this.supplement = gettersetter(0);
      /**
       * Loads the wastage values from localStorage
       */
      this.load = function() {
        var default_waste = window.localStorage.getItem('wastage');
        if(default_waste != undefined) {
          this.pasture(default_waste.pasture);
          this.supplement(default_waste.supplement);
        }
      };
      this.load();
    }
    wastage.prototype = {
      /**
       * Save the wastage values to localStorage
       */
      save: function() {
        var default_waste = {
          pasture: this.pasture(),
          supplement: this.supplement()
        };
        window.localStorage['wastage'] = default_waste;
      }
    };

    return new wastage();

  }]);
