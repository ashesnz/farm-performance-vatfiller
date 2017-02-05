angular.module('vatFiller')
  .factory('supplements', ['supplement', function(supplement) {
    function Supplements() {
      this.list = [];
      var default_suppl =  window.localStorage.getItem('supplements');
      if(default_suppl !== null) {
        default_suppl.forEach(function(suppl) {
          this.list.push(new supplement(suppl.name,suppl.quality,suppl.propDM,suppl.density,suppl.utilisation));
        },this);
      } else {
        this.list.push(new supplement('Palm kernel extract',       11.3,   90, 690, 100));
        this.list.push(new supplement('Silage, Pasture, good',     11,     33, 175, 100));
        this.list.push(new supplement('Silage, Maize, low grain',  10.3,   34, null, 100));
      }
    }
    Supplements.prototype = {
      // only saves the default paddock parameter
      saveAsDefault: function() {
        var supplJSON = [];
        this.list.forEach(function(suppl) {
          supplJSON.push({
            name: suppl.name(),
            quality: suppl.quality(),
            propDM: suppl.propDM(),
            density: suppl.density()
            // using Wastage service to calculate
            //utilisation: suppl.utilisation()
          });
        });
        window.localStorage['supplements'] = supplJSON;
      },
      qttDM: function() {
        var total = 0;
        this.list.forEach(function (s) {
          total += s.qtt() * (s.quality()/11) * s.utilisation();
        });
        return total;
      },
      addSupplement: function(name,quality, propDM, density, util) {
        if(!this.list.some(function(s) {
            return name == s.name();
          })) {
          //console.log('adding supplement',name);
          var suppl = new supplement(name, quality, propDM, density, util);
          this.list.push(suppl);
          return suppl;
        }
        else {console.log('supplement already exists',name);}
      },
      removeSupplement: function(indexOrName) {
        var newList = [];
        var isNum = angular.isNumber(indexOrName);
        this.list.forEach(function(suppl,i) {
          if( (isNum && i !== indexOrName) || (!isNum && suppl.name() !== indexOrName) ) {
            newList.push(suppl);
          }
        });
        this.list = newList;
      },
      getPredefinedList: function() {
        return [
          new supplement('Silage, Pasture, good',     11,     33, 175, 100),
          new supplement('Silage, Pasture, poor',     9,      36, 175, 100),
          new supplement('Silage, Baleage',           10.5,   40, 155, 100),
          new supplement('Silage, Lucerne',           10,     40, null, 100),
          new supplement('Silage, Maize, high grain', 10.9,   36, null, 100),
          new supplement('Silage, Maize, low grain',  10.3,   34, null, 100),
          new supplement('Silage, Pea',               9.3,    33, null, 100),
          new supplement('Hay, Pasture, good',        9.5,    85, null, 100),
          new supplement('Hay, Pasture, poor',        7.5,    85, null, 100),
          new supplement('Hay, Barley straw',         6.5,    87, null, 100),
          new supplement('Hay, Pea straw',            7.5,    85, null, 100),
          new supplement('Hay, Wheat straw',          6.4,    89, null, 100),
          new supplement('Crops, Chicory',            12.7,   14, null, 100),
          new supplement('Crops, Fodder Beet',        12.3,   17, null, 100),
          new supplement('Crops, Kale',               12.3,   13, null, 100),
          new supplement('Crops, Swedes',             11.8,   11, null, 100),
          new supplement('Crops, Turnips',            12,     10, null, 100),
          new supplement('Concentrate, Barley',       12.5,   88, null, 100),
          new supplement('Concentrate, Bran',         10,     89, null, 100),
          new supplement('Concentrate, Maize grain',  13.5,   88, null, 100),
          new supplement('Concentrate, Oats',         11.5,   89, null, 100),
          new supplement('Concentrate, Peas',         13,     87, null, 100),
          new supplement('Concentrate, Soya bean meal', 12.5, 90, null, 100),
          new supplement('Concentrate, Wheat',        13.3,   87, null, 100),
          new supplement('Apple pomace',              10.5,   22, null, 100),
          new supplement('Brewer grains',             10.5,   23, null, 100),
          new supplement('Broll',                     10.3,   87, null, 100),
          new supplement('Carrots',                   13,     13, 630, 100),
          new supplement('Fishmeal',                  11.7,   92, null, 100),
          new supplement('Kiwifruit (ripe)',          10,     14, null, 100),
          new supplement('Kiwifruit (hard)',          12.3,   20, null, 100),
          new supplement('Molasses',                  11.5,   75, null, 100),
          new supplement('Onions',                    13,     10, 680, 100),
          new supplement('Palm kernel extract',       11.3,   90, 690, 100),
          new supplement('Potatoes',                  13,     20, 660, 100),
          new supplement('Proliq',                    10,     36, null, 100),
          new supplement('Sweetcorn silage',          10,     20, null, 100),
          new supplement('Tallow',                    38,     99, null, 100),
          new supplement('Tapioca',                   12.5,   88, null, 100)
        ];
      },
      _toJSON: function() {
        return this.list.map(function(suppl) {
          return suppl._toJSON();
        });
      }
    };

    return Supplements;

  }]);
