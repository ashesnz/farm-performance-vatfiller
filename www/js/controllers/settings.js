angular
  .module('vatFiller')
  .controller('SettingsController', settings)


settings.$inject = ['$scope', 'grazingplan'];

function settings($scope, grazingplan){
  var self = this;

  $scope.page = {
    settingsTitle: "SETTINGS"
  };

  grazingplan.init(); // Make sure that the GrazingPlan is initialised (because Mobs will be reinitialised anyway)

}

angular
  .module('vatFiller')
  .controller('SettingsMobsController', settingsMob)

settingsMob.$inject = ['$scope', 'mobs', 'grazingplan'];

function settingsMob($scope, mobs, grazingplan) {
  $scope.settingsTitle = "SETTINGS: Mobs";
  $scope.addMobForm = false;
  $scope.saveMob = function() {

    $scope.addMobForm = false;
    if ($scope.addedMob) {
      $scope.groups.list.push($scope.addedMob);
    }
    mobs.save();
    grazingplan.init();
  };
  /* GROUPS */
  $scope.deleteMob = function(index) {
    $scope.groups.removeMob(index);
    mobs.save();
  };


  $scope.addMob = function() {
      $scope.addMobForm = true;
      $scope.addedMob = $scope.groups.addMob('',10,17);
  };

  $scope.saveGroup = function(index) {
    if(angular.isDefined(index)) { // saving existing Supplement
      mobs.save();
      grazingplan.init();
    }
  };
  $scope.defaultGroup = function(index) {
    $scope.groups.default = index;
  };

  $scope.load = function() {
    mobs.load();
    $scope.groups = mobs;


  };

  $scope.load();

}

angular
  .module('vatFiller')
  .controller('SettingsPaddockController', settingsPaddock)

settingsPaddock.$inject = ['$scope', 'paddock', 'grazingplan'];

function settingsPaddock($scope, paddock, grazingplan) {
  $scope.settingsTitle = "SETTINGS: Paddock";
  $scope.savePaddock = function() {
    $scope.paddock.saveAsDefault();
    grazingplan.init();

  };

  $scope.load = function() {
    $scope.paddock = new paddock();
  };

  $scope.cancel = function() { $scope.load(); };

  $scope.defaultPaddockGroup = function() {

  }

  $scope.savePaddockSettings = function() {

  }

  $scope.load();
}

angular
  .module('vatFiller')
  .controller('SettingsWastageController', settingsWastage)

settingsWastage.$inject = ['$scope', 'paddock', 'grazingplan'];

function settingsWastage($scope, paddock, grazingplan) {
  $scope.settingsTitle = "SETTINGS: Paddock";
  $scope.saveWastage = function() {
    $scope.paddock.saveAsDefault();
    grazingplan.init();

  };
  $scope.load = function() {
    $scope.paddock = new paddock();
  };
  $scope.cancel = function() { $scope.load(); };

  $scope.cancel = function() { $scope.load(); };

  $scope.defaultWastage = function() {

  }

  $scope.load();
}


angular
  .module('vatFiller')
  .controller('SettingsSupplementsController', settingsSupplements)


settingsSupplements.$inject = ['$scope', 'supplements', 'supplement', 'grazingplan'];

function settingsSupplements($scope, supplements, supplement, grazingplan) {
  $scope.settingsTitle = "SETTINGS: Supplements";

  $scope.saveSupplements = function() {
    $scope.predefinedList.forEach(function(s) {
      if(s.selected) {
        $scope.supplements.addSupplement(s.name(), s.quality(), s.propDM(), s.density());
      } else {
        //console.log('Attempting to remove',s.name());
        $scope.supplements.removeSupplement(s.name());
      }
    });
    $scope.supplements.saveAsDefault();
    grazingplan.init();

  };

  $scope.listlength = 20;

  $scope.loadMore = function(){
    if (!$scope.predefinedList){
      $scope.$broadcast('scroll.infiniteScrollComplete');
      return;
    }

    if ($scope.listlength < $scope.predefinedList.length)
      $scope.listlength+=10;
    $scope.$broadcast('scroll.infiniteScrollComplete');
  }

  $scope.load = function() {
    $scope.supplements = new supplements();
    $scope.predefinedList = $scope.supplements.getPredefinedList();
    $scope.predefinedList.forEach(function(s) {
      s.selected = false;
    });
    $scope.supplements.list.forEach(function(suppl) {
      var found = $scope.predefinedList.some(function(s) {
        if(s.name() === suppl.name()) {
          s.selected = true;
          return true;
        } else {
          return false;
        }
      });
      if(!found) {
        var manuallyAddedSuppl = new supplement(suppl.name(),suppl.quality());
        manuallyAddedSuppl.selected = true;
        $scope.predefinedList.push(manuallyAddedSuppl)
      }
    });


    $scope.supplementEdit = [];
    $scope.supplements.list.forEach(function() {
      $scope.supplementEdit.push(false);
    });

  };
  $scope.cancel = function() {
    $scope.load();
  };
  $scope.load();



}
