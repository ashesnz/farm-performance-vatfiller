angular
  .module('vatFiller')
  .factory('grazingplan', ['gettersetter', 'paddock', 'supplements', 'mob', 'mobs', function(gettersetter, paddock, supplements, mob, mobs) {
    return {
      list: [],
      fromJSON: false,
      mob: gettersetter(mobs.list[mobs.default]),
      init: function(grazingType,mob) {
        var prefixes = [ undefined ];
        switch(grazingType) {
          case '1aDay':
            this.grazNum = 1;
            this.days = 1;
            this.steps = 4;
            break;
          case '2aDay':
            prefixes = [ 'Morning', 'Afternoon' ];
            this.grazNum = 2;
            this.days = 1;
            this.steps = 4;
            break;
          case '3in2Days':
            prefixes = [ 'First', 'Second', 'Third' ];
            this.grazNum = 3;
            this.days = 2;
            this.steps = 8;
            break;
          case 'winter':
            this.grazNum = 1;
            this.days = 1;
            this.steps = 6;
            break;
          default:
            this.grazNum = 0;
            break;
        }
        if(angular.isDefined(mob)) {
          this.mob(mob); // if undefined, keep the previous mob.
        }
        this.type = grazingType;
        //console.log(this.list.length, this.grazNum);
        if(this.list.length != this.grazNum || this.fromJSON) {
          this.fromJSON = false;
          //console.log('reinit');
          if(angular.isUndefined(mob)) {
            //console.log('default mob is reset');
            this.mob(mobs.list[mobs.default]); // if undefined and GrazingPlan is reinitialised, use default mob.
          }
          //console.log('init Feedplan');
          this.list = [];
          /*
           Supplements.Supplement.prototype.qttPerCow = function(val) {
           if(angular.isDefined(val)) {
           this.qtt(val * getMob().size());
           } else {
           var roundedQtt = Math.round(100 * this.qtt() / getMob().size())/100;
           return roundedQtt;
           }
           };
           */
          for (var i = 0; i < this.grazNum; i++) {
            this.list.push({
              prefix: prefixes[i],
              paddock: new paddock(),
              supplements: new supplements()
            });
          }
        }
        return this;
      },
      totalDemand: function() {
        return this.mob().demand()*this.days;
      },
      /*pastureAreaRequired: function(paddock) {
        var quality_ratio = paddock.quality()/11;
        var missingArea = this.missingFeed() / ((paddock.cover() - paddock.residual()) * quality_ratio * paddock.utilisation());
        return paddock.size() + missingArea;
      },*/
      missingFeed: function() {
        var feedMissing = this.totalDemand();
        this.list.forEach(function(feedPlan) {
          feedMissing = feedMissing - feedPlan.paddock.qttDM() - feedPlan.supplements.qttDM();
        });
        return (Math.abs(feedMissing)<1)?0:feedMissing;
      },
      missingFeedPerCow: function() {
        return this.missingFeed()/this.mob().size();
      },
      _toJSON: function() {
        var feedPlan = {
          type: this.type,
          mob: this.mob()._toJSON(),
          feedPlans: []
        };
        this.list.forEach(function(plan) {
          feedPlan.feedPlans.push({
            title: plan.title,
            paddock: plan.paddock._toJSON(),
            supplements: plan.supplements._toJSON()
          });
        },this);
        return feedPlan;
      },
      _fromJSON: function(fp) {
        // if old version -> update format
        if(angular.isNumber(fp.type)) {
          switch(fp.type) {
            case 1:
              fp.type = '1aDay';
              break;
            case 2:
              fp.type = '2aDay';
              break;
            default:
              fp.type = '';
              break;
          }
        }
        if(fp.hasOwnProperty('group')) {
          fp.mob = fp.group;
        }
        // now format is ok => keep going
        var aMob = new mob();
        aMob._fromJSON(fp.mob);
        this.init(fp.type, aMob);
        this.fromJSON = true;
        //console.log('importing feedplan',fp.type,fp.mob,fp.feedPlans);
        //console.log('importing mob',fp.mob.name,fp.mob.size,fp.mob.intake);
        // REINIT MOBS
        fp.feedPlans.forEach(function(p,i) {
          var plan = this.list[i];
          plan.title = p.title;
          plan.paddock._fromJSON(p.paddock);
          // FIXME move this to Supplements and call plan.supplements._fromJSON()...
          p.supplements.forEach(function(s) {
            var match = false;
            plan.supplements.list.forEach(function(suppl) {
              if(suppl.name() == s.name) {
                match = true;
                suppl.qtt(s.qtt);
              }
            });
            if(!match) {
              var suppl = plan.supplements.addSupplement(s.name,s.quality,s.propDM,s.density);
              suppl.qtt(s.qtt);
            }
          });
        },this);
      }
    };
  }]);
