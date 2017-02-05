angular.module('vatFiller')
  .factory('paddock', ['gettersetter', 'wastage', function(gettersetter, wastage) {
    function paddock() {
      this.cover = gettersetter(2500);
      this.size = gettersetter(4);
      this.residual = gettersetter(1500);
      this.quality = gettersetter(11);
      // using Wastage service to calculate
      //this._utilisation = 0.94;

      var default_paddock = JSON.parse(window.localStorage.getItem('default_paddock'));
      if(default_paddock !== null) {
        this.cover(default_paddock.cover);
        this.size(default_paddock.size);
        this.residual(default_paddock.residual);
        if(default_paddock.hasOwnProperty('quality')) {
          this.quality(default_paddock.quality);
        }
        // using Wastage service to calculate
        /*
         if(default_paddock.hasOwnProperty('utilisation')) {
         this.utilisation(default_paddock.utilisation);
         }
         */
      }

    }
    paddock.prototype = {
      // only saves the default paddock parameter
      saveAsDefault: function() {
        /*localStorageService.set('default_paddock',{
          cover: this.cover(),
          size: this.size(),
          residual: this.residual(),
          quality: this.quality()
          // using Wastage service to calculate
          //utilisation: this.utilisation()
        });*/
      },
      // read-only
      utilisation: function() {
        return (1 - wastage.pasture()/100);
      },
      qttDM: function() {
        var quality_ratio = this.quality()/11;
        var total_DM = (this.cover() - this.residual()) * this.size() * this.utilisation();
        return  total_DM * quality_ratio;
      },
      /*
       pregrazeRequired: function(demand) {
       return demand/this.size() + this.residual();
       },
       pastureAreaRequired: function () {
       var quality_ratio = this.quality()/11;
       var missingArea = this.feedplan.calculateMissingFeed() / ((this.cover() - this.residual()) * quality_ratio * this.utilisation());
       return this.size() + missingArea;
       },
       */
      _toJSON: function() {
        return {
          cover: this.cover(),
          size: this.size(),
          residual: this.residual(),
          quality: this.quality()
        };
      },
      _fromJSON: function(p) {
        this.cover(p.cover);
        this.size(p.size);
        this.residual(p.residual);
        this.quality(p.quality);
      }

    };

    return paddock;

  }]);
