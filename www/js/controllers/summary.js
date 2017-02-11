angular
  .module('vatFiller')
  .controller('SummaryController', summary);

summary.$inject = ['$scope', 'grazingplan', 'feedometer'];

function summary($scope, grazingplan, feedometer){

  $scope.summaryList = JSON.parse(window.localStorage.getItem('summaries'));
  if ($scope.summaryList && $scope.summaryList.length > 0) {
    $scope.summaryList.reverse()
    $scope.selectedSummary = $scope.summaryList[0];
  }

  $scope.selection = function(val) {
    $scope.selectedSummary = val;
      updateSummary();
  }

  function updateSummary() {

    if($scope.selectedSummary) {
      var summaryPlan = JSON.parse($scope.selectedSummary.plan);
      grazingplan._fromJSON(summaryPlan);
      feedometer.refresh();
      $scope.noSummary = false;
    } else {
      $scope.noSummary = true;
    }
  }
  updateSummary();

}
