angular.module('vatFiller')
  .directive('paddockInfo', function() {
  return {
    restrict: 'E',
    scope: {
      displayForm: '=',
      winterInput: '=',
      displayQuality: '=',
      onChange: '&onChange',
      paddockPregraze: '=',
      paddockPrefix: '=',
      paddock: '='

    },
    templateUrl: 'templates/widgets/paddockInfo.html'
  }
})
  .controller('PaddockInfoController', ['$scope', '$ionicModal', 'features', 'paddock', 'grazingplan', function($scope, $ionicModal, features) {





  }]);
