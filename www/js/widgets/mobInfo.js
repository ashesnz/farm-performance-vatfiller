angular.module('vatFiller')
    .directive('mobInfo', function() {
        return {
            restrict: 'E',
            scope: {
                mob: '=',
                displayDemand: '=',
                onChange: '&onChange',
                displayForm: '=',
                editName: '=',
                displayName: '='
            },
            templateUrl: 'templates/widgets/mobInfo.html'
        }
    })
    .controller('MobInfoController', ['$scope', '$ionicModal', 'features', 'mobs', function($scope, $ionicModal, features, mobs) {
      $scope.currentMobs = mobs.list;

      $ionicModal.fromTemplateUrl('mobInfoModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };

        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });


        var MJME_TABLES = {
            maintenance: {
                '300 kg': 40,
                '350 kg': 45,
                '400 kg': 50,
                '450 kg': 54,
                '500 kg': 59,
                '550 kg': 63,
                '600 kg': 68
            },
            perKgMS: {
                Jersey: 77,
                JxF: 80,
                Friesian: 82
            },
            walkingPerKm: {
                flat: 2,
                rolling: 3,
                'hilly/steep': 6
            },
            weeksBeforeCalving: {
                'not pregnant': { Jersey: 0, JxF: 0, Friesian: 0 },
                '12 weeks left': { Jersey: 11, JxF: 12, Friesian: 13 },
                '8 weeks left':  { Jersey: 18, JxF: 21, Friesian: 23 },
                '4 weeks left':  { Jersey: 32, JxF: 37, Friesian: 41 },
                '2 weeks left':  { Jersey: 42, JxF: 48, Friesian: 54 }
            },
            kgChange: {
                dry:     { gain: 72, loss: 30 },
                milking: { gain: 50, loss: 37 }
            }

        };

        $scope.values = {
            lwt: Object.keys(MJME_TABLES.maintenance),
            breed: Object.keys(MJME_TABLES.perKgMS),
            landSlope: Object.keys(MJME_TABLES.walkingPerKm),
            weeksBeforeCalving: Object.keys(MJME_TABLES.weeksBeforeCalving)
        };
        $scope.enableIntakeCalculator = features.widgets.intakeCalculator;

        $scope.calculateIntake = function() {
            var totalMJME = 0;
            // maintenance
            totalMJME += MJME_TABLES.maintenance[$scope.mob.model.lwt];
            // milk production
            totalMJME += MJME_TABLES.perKgMS[$scope.mob.model.breed]*$scope.mob.model.milkProduction;
            // walking
            totalMJME += MJME_TABLES.walkingPerKm[$scope.mob.model.landSlope]*$scope.mob.model.walkingDistance;
            // pregnancy
            totalMJME += MJME_TABLES.weeksBeforeCalving[$scope.mob.model.weeksBeforeCalving][$scope.mob.model.breed];
            // wight gain
            var gainOrLoss = $scope.mob.model.weightGain>0?'gain':'loss';
            var dryOrMilking = $scope.mob.model.milkProduction>0?'milking':'dry';
            totalMJME += MJME_TABLES.kgChange[dryOrMilking][gainOrLoss]*$scope.mob.model.weightGain;


            return {
                    MJME: totalMJME,
                    DM: totalMJME / 11
            };
        };
        $scope.copyAndClose = function() {
            var DM = $scope.calculateIntake().DM;
            $scope.mob.intake(Math.round(DM*10)/10);
            $scope.modal.hide();
        };
    }]);
