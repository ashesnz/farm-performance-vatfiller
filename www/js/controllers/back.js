angular
  .module('vatFiller')
.controller('BackController', ['$scope', '$ionicHistory', function($scope, $ionicHistory) {
  $scope.goBack = function () {
    $ionicHistory.goBack();
  };
}])
