angular.module('vatFiller').controller('FeedbackController', feedback);

feedback.$inject = ['$scope', '$ionicLoading', '$ionicHistory', '$timeout'];

function feedback($scope, $ionicLoading, $ionicHistory, $timeout){
  var self = this;

  $scope.submit = function() {
    var obs = {
      type: 'feedback',
      begin: Date.now(),
      attributes: {
        comment: $('#feedbackArea').prop('value')
      }
    };
/*    Tracer.get('feedback').create_obsel(obs);
    Tracer.get('activity').create_obsel(obs);*/
    $ionicLoading.show({
      template: 'Thank you for your feedback!'
    });
    $timeout(function() {
      $ionicLoading.hide();
      $ionicHistory.goBack();
    },900);
  };
}

