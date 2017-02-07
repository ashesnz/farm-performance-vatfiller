angular.module('vatFiller')
    .directive('formatNum', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                function updateValue(num) {
                    if(isNaN(num) || num == Infinity) {
                        element.text("\u2013");
                    } else {
                        element.text(numeral(num).format('0,0.[00]'));
                    }
                }

                scope.$watch(attrs.formatNum, updateValue);
            }
        }
    })

    .directive('stepsNav', function() {
        return {
            restrict: 'E',
            scope: {
                steps: '='
            },
            templateUrl: 'templates/widgets/steps.html'
        }
    })
    .directive('selectOnFocus', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('focus', function () {
                    var input_field = this;
                    setTimeout(function() {
                        input_field.select()
                        input_field.setSelectionRange(0,99);
                    }, 10);
                });
            }
        };
    })
    .directive('menuCloseKeepHistory', ['$ionicHistory', function($ionicHistory) {
        return {
            restrict: 'AC',
            link: function($scope, $element) {
                $element.bind('click', function() {
                    var sideMenuCtrl = $element.inheritedData('$ionSideMenusController');
                    if (sideMenuCtrl) {
                        $ionicHistory.nextViewOptions({
                            historyRoot: false,
                            disableAnimate: true,
                            expire: 300
                        });
                        sideMenuCtrl.close();
                    }
                });
            }
        };
    }]);
