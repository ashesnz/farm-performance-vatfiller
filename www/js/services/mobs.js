/**
 * Created by ashwin on 1/02/17.
 */
angular.module('vatFiller')
  .service('mobs', mobs);

  mobs.$inject = ['mob'];

  function mobs(mob) {

    var service = this;
    service.load = function() {
      this.list = [];
      var mobs = JSON.parse(window.localStorage.getItem('mobs'));
      if(mobs !== null) {
        this.default = mobs.default;
        mobs.list.forEach(function(aMob) {
          var options = {};
          if(aMob.hasOwnProperty('model')) { options.model = aMob.model; }
          if(aMob.hasOwnProperty('id')) { options.id = aMob.id; }
          this.list.push(new mob(aMob.name, aMob.size, aMob.intake, options));
        },this);
      } else {
        // TEMP FIX -> CHECK WHAT WAS PREVIOUSLY CALLED GROUPS (ONCE IF has moved to v0.1.2.2+ -> can be removed)
        var groups = window.localStorage.getItem('groups');
        if(groups !== null) {
          this.default = groups.default;
          groups.list.forEach(function(mob) {
            this.list.push(new mob(mob.name,mob.size,mob.intake));
          },this);
          // store it properly for next time.
          window.localStorage['groups'] = groups;
        } else {
          this.list.push(new mob("default mob",300,17));
          this.default = 0;
        }
      }
    };
    this.load();


    // only saves the default paddock parameter
    service.save = function() {
      var mobsJSON = {
        list: [],
        default: this.default
      };
      this.list.forEach(function(mob) {
        mobsJSON.list.push(mob._toJSON());
      });
      localStorage.setItem('mobs', JSON.stringify(mobsJSON));
    };

    service.addMob = function(name,size,intake,options) {
      var aMob = new mob(name,size,intake,options);
      this.list.push(aMob);
      return aMob;
    };

    service.removeMob = function(index) { // FIXME use id instead of index.
      var newList = [];
      this.list.forEach(function(mob,i) {
        if(i !== index ) {
          newList.push(mob);
        }
      });
      this.list = newList;
    };

}



