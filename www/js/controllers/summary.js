angular
  .module('vatFiller')
  .controller('SummaryController', summary);

summary.$inject = ['$scope', 'summaries', 'grazingplan', 'feedometer'];

function summary($scope, summaries, grazingplan, feedometer){
  var self = this;
  $scope.summaries = summaries.get();
  $scope.mobList = Object.keys($scope.summaries);

  var selectedMob = $scope.mobList[0];
  $scope.selectMob = function(val) {
    if(angular.isUndefined(val)) {
      return selectedMob;
    } else {
      selectedMob = val;
      updateSummary();
    }
  };


  function updateSummary() {
    if($scope.mobList.length > 0) {
      grazingplan._fromJSON($scope.summaries[selectedMob].plan);
      feedometer.refresh();
      $scope.noSummary = false;
    } else {
      $scope.noSummary = true;
    }
  }
  updateSummary();

}
