angular
  .module('vatFiller')
  .controller('MenuController', menu);

menu.$inject = ['$scope', 'manifest', 'version', 'features'];

function menu($scope, manifest, version, features) {
  var self = this;
  $scope.version = version;
  $scope.features = features;

  manifest.initListeners();
  manifest.checkStatus();
  if(window.navigator.standalone) {
    angular.element(document.getElementsByTagName('body')).prepend('<div class="iPhoneTopBar"></div>');
    // fixes iOS issue with clicks on input fields...
    document.addEventListener('mousedown',function(e) {
      if(ionic.tap.containsOrIsTextInput(e.target)) {
        e.stopImmediatePropagation();
      }
    });
  }
/*  var login = localStorageService.get('login');
  // init UUID
  var unique_id = localStorageService.get('uuid');
  if(angular.isUndefined(unique_id) || unique_id == null) {
    unique_id = uuid();
    localStorageService.set('uuid',unique_id);
  }*/



}
