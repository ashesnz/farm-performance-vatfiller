angular.module('vatFiller')
    .directive('supplementList', function() {
        return {
            restrict: 'E',
            scope: {
                feedPlanIndex: '='
            },
            templateUrl: 'templates/widgets/supplementList.html'
        }
    })
    .controller('SupplementListController', ['$scope', 'grazingplan', '$timeout', function($scope, grazingplan, $timeout) {

        $scope.feedPlan = grazingplan.list[$scope.feedPlanIndex];

        $scope.qttPerCow = function(suppl) {
          return function(val) {
              if(angular.isDefined(val)) {
                  return suppl.qtt(val*grazingplan.mob().size())
              }
              var qttPerCow = suppl.qtt()/grazingplan.mob().size();
              return Math.round(qttPerCow*100)/100;
          }
        };

        $scope.autofill = function(supplIndex) {
            var css = 'value-changed-ok';
            var suppl = grazingplan.list[$scope.feedPlanIndex].supplements.list[supplIndex];
            var newQtt = suppl.qtt() + grazingplan.missingFeed()* (11/suppl.quality()) / suppl.utilisation();
            if(newQtt < 0) {
                newQtt = 0;
                css = 'value-changed-alert';
            }
            suppl.qtt(newQtt);
            grazingplan.list[$scope.feedPlanIndex].supplements.list[supplIndex].css = css;
            $timeout(function(){
              grazingplan.list[$scope.feedPlanIndex].supplements.list[supplIndex].css = '';
            },500)
        };

    }]);
