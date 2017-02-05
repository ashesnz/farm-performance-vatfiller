angular
  .module('vatFiller')
  .controller('ConfirmationController', confirmation);

confirmation.$inject = ['$scope'];

function confirmation($scope){
  var self = this;

  $scope.email = window.localStorage['recipient_email'];

}
