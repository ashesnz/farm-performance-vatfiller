angular
  .module('vatFiller')
  .controller('AboutController', about);


about.$inject = ['$scope', 'manifest'];

function about($scope, manifest){
  var self = this;

  $scope.checkForUpdates = function () {
    manifest.checkForUpdates();
  };

  $scope.unique_id = window.localStorage.getItem('uuid');
}
