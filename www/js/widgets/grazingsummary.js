angular.module('vatFiller')
    .directive('grazingSummary', function() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'templates/widgets/grazingSummary.html'
        }
    })
    .controller('GrazingSummaryController', ['$scope', 'grazingplan', function($scope, grazingplan) {
        $scope.grazingPlan = grazingplan;
        $scope.mob = function() { return grazingplan.mob(); };

        $scope.qttPerCow = function(suppl) {
            return function(val) {
                return angular.isDefined(val)?suppl.qtt(val*grazingplan.mob().size()):suppl.qtt()/grazingplan.mob().size();
            }
        };
    }]);
