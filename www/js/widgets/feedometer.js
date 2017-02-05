angular.module('vatFiller')
    .directive('feedometer', function() {
        return {
            restrict: 'E',
            scope: {
                displayLabels: '='
            },
            templateUrl: 'templates/widgets/feedometer.html'
        }
    })
    .factory('feedometer', ['grazingplan', function(grazingplan) {
        var returnFunction = function(toReturn) {
            return function() {
                return toReturn;
            };
        };
        var scale = function() {
          return 100 / grazingplan.totalDemand();
        };
        var buildGrassItem = function(i) {
            return function() {
                return grazingplan.list[i].paddock.qttDM() * scale();
            }
        };
        var buildSupplItem = function(i) {
            return function() {
                return grazingplan.list[i].supplements.qttDM() * scale();
            }
        };

        var labels, feed = [];
        function init() {
            feed = [];
            switch(grazingplan.list.length) {
                case 2:
                    labels = ["AM", "PM"];
                    break;
                default:
                    labels = ["","","",""];
            }

            for (var i = 0; i < grazingplan.list.length; i++) {
                feed.push({
                    label: returnFunction(labels[i]),
                    type: returnFunction("grass"),
                    size: buildGrassItem(i)
                });
                feed.push({
                    label: returnFunction('SUPPLEMENT'),
                    type: returnFunction("supplement"),
                    size: buildSupplItem(i)
                });
            }
        }
        init();

        return {
            status: function() {
                var acceptableError = grazingplan.totalDemand() / 1000;
                var feedMissing = grazingplan.missingFeed();
                if (feedMissing > acceptableError) {
                    // underfed
                    return "status-underfed";
                } else if (feedMissing < -acceptableError) {
                    // overfed
                    return "status-overfed";
                } else {
                    return "status-ok";
                }
            },
            feedList: function() {
                return feed;
            },
            refresh: init
        };
    }])
    .controller('FeedometerController', ['$scope', 'feedometer', 'grazingplan', function($scope, feedometer, grazingplan) {
        feedometer.refresh();
        $scope.graph = feedometer;
        $scope.calculateMissingFeedPerCow = function () {
            return grazingplan.missingFeedPerCow();
        };
    }]);
