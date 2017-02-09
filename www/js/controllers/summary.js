angular
  .module('vatFiller')
  .controller('SummaryController', summary);

summary.$inject = ['$scope', 'summaries', 'grazingplan', 'feedometer'];

function summary($scope, summaries, grazingplan, feedometer){
  var self = this;
  $scope.summaryList = summaries.get();
  var selectedSummary = {};
  var mobList = Object.keys($scope.summaryList);
  if (mobList.length > 0) {
    selectedSummary = mobList[0];
  }

  $scope.selectedSummary = function(val) {
      selectedSummary = val;
      updateSummary();
  }

  function updateSummary() {
    if($scope.summaryList[selectedSummary]) {
      grazingplan._fromJSON($scope.summaryList[selectedSummary].plan);
      feedometer.refresh();
      $scope.noSummary = false;
    } else {
      $scope.noSummary = true;
    }
  }
  updateSummary();

}
