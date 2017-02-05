angular
  .module('vatFiller')
  .controller('SettingsController', settings)


settings.$inject = ['$scope', '$ionicModal',  'grazingplan'];

function settings($scope, $ionicModal, grazingplan){
  var self = this;

  $scope.page = {
    title: "SETTINGS",
    back: function() { $scope.modal.hide(); },
    changed: false,
    change: function() {
      this.changed = true;
    }
  };

  grazingplan.init(); // Make sure that the GrazingPlan is initialised (because Mobs will be reinitialised anyway)

  // MODAL BOXES
  var modalMobs, modalPaddock, modalWastage, modalSupplements;
  $ionicModal.fromTemplateUrl('templates/settingsMobs.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    modalMobs = modal;
  });
  $scope.openModalMobs = function() {
    $scope.modal = modalMobs;
    $scope.modal.show();
  };

  $ionicModal.fromTemplateUrl('templates/settingsPaddock.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    modalPaddock = modal;
  });
  $scope.openModalPaddock = function() {
    $scope.modal = modalPaddock;
    $scope.modal.show();
  };

  $ionicModal.fromTemplateUrl('templates/settingsWastage.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    modalWastage = modal;
  });
  $scope.openModalWastage = function() {
    $scope.modal = modalWastage;
    $scope.modal.show();
  };

  $ionicModal.fromTemplateUrl('templates/settingsSupplements.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    modalSupplements = modal;
  });
  $scope.openModalSupplements = function() {
    $scope.modal = modalSupplements;
    $scope.modal.show();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    modalMobs.remove();
    modalPaddock.remove();
    modalWastage.remove();
    modalSupplements.remove();
  });
}

angular
  .module('vatFiller')
  .controller('SettingsMobsController', settingsMob)

settingsMob.$inject = ['$scope', 'mobs', 'grazingplan'];

function settingsMob($scope, mobs, grazingplan) {
  $scope.modalTitle = "SETTINGS: Mobs";
  $scope.save = function() {
    mobs.save();
    grazingplan.init();
    $scope.page.changed = false;
    $scope.modal.hide();
  };
  /* GROUPS */
  $scope.deleteGroup = function(index) {
    $scope.groups.removeMob(index);
    $scope.groupEdit.splice(index,1);
    $scope.page.changed = true;
  };
  $scope.editGroup = function(index) {
    if(angular.isDefined(index)) { // editing existing Supplement
      $scope.groupEdit[index] = true;
    } else { // editing new Supplement
      $scope.groupEdit.push(true);
      $scope.groups.addMob('',10,17);
    }
  };
  $scope.saveGroup = function(index) {
    if(angular.isDefined(index)) { // saving existing Supplement
      $scope.groupEdit[index] = false;
      Mobs.save();
      grazingplan.init();
      $scope.page.changed = false;
    }
  };
  $scope.defaultGroup = function(index) {
    $scope.groups.default = index;
    $scope.page.changed = true;
  };

  $scope.load = function() {
    mobs.load();
    $scope.groups = mobs;
    $scope.groupEdit = [];
    $scope.groups.list.forEach(function() {
      $scope.groupEdit.push(false);
    });

    $scope.page.changed = false;
  };
  $scope.cancel = function() { $scope.load(); };
  $scope.load();
}

angular
  .module('vatFiller')
  .controller('SettingsPaddockController', settingsPaddock)

settingsPaddock.$inject = ['$scope', 'paddock', 'grazingplan'];

function settingsPaddock($scope, paddock, grazingplan) {
  $scope.modalTitle = "SETTINGS: Paddock";
  $scope.save = function() {
    $scope.paddock.saveAsDefault();
    grazingplan.init();
    $scope.page.changed = false;
    $scope.modal.hide();
  };

  $scope.load = function() {
    $scope.paddock = new paddock();
    $scope.page.changed = false;
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
  $scope.modalTitle = "SETTINGS: Paddock";
  $scope.save = function() {
    $scope.paddock.saveAsDefault();
    grazingplan.init();
    $scope.page.changed = false;
    $scope.modal.hide();
  };
  $scope.load = function() {
    $scope.paddock = new paddock();
    $scope.page.changed = false;
  };
  $scope.cancel = function() { $scope.load(); };

  $scope.cancel = function() { $scope.load(); };

  $scope.defaultWastage = function() {

  }

  $scope.saveWastageSettings = function() {

  }

  $scope.load();
}


angular
  .module('vatFiller')
  .controller('SettingsSupplementsController', settingsSupplements)

settingsSupplements.$inject = ['$scope', 'supplements', 'supplement', 'grazingplan'];

function settingsSupplements($scope, supplements, supplement, grazingplan) {
  $scope.modalTitle = "SETTINGS: Supplements";
  $scope.save = function() {
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
    $scope.page.changed = false;
    $scope.modal.hide();
  };
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


    $scope.page.changed = false;
  };
  $scope.cancel = function() { $scope.load(); };
  $scope.load();


  $scope.defaultSupplements = function() {

  }

  $scope.saveSupplementsSettings = function() {

  }

}
