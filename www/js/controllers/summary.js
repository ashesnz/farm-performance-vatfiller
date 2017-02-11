angular
  .module('vatFiller')
  .controller('SummaryController', summary);

summary.$inject = ['$scope', 'summaries', 'grazingplan', 'feedometer'];

function summary($scope, summaries, grazingplan, feedometer){
  var self = this;
  $scope.summaryList = summaries.get();
  var selectedSummary = {};
  if ($scope.summaryList.length > 0) {
    selectedSummary = $scope.summaryList[0];
  }

  $scope.selectedSummary = function(val) {
      selectedSummary = val;
      updateSummary();
  }

  function updateSummary() {
    if(selectedSummary) {
      var summaryPlan = JSON.parse(selectedSummary.plan);
      grazingplan._fromJSON(summaryPlan);
      feedometer.refresh();
      $scope.noSummary = false;
    } else {
      $scope.noSummary = true;
    }
  }
  updateSummary();

}
