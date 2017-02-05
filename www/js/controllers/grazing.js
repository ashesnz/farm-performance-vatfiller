angular
  .module('vatFiller')
  .controller('GrazingController', grazing);


grazing.$inject = ['$scope', '$stateParams', '$location', 'features', 'mobs', 'grazingplan', 'paddock', 'savedcalendar', 'summaries'];

function grazing($scope, $stateParams, $location, mobs, features, grazingplan, paddock, savedcalendar, summaries){
  var self = this;

  var grazType =  $stateParams.grazType;
  var step =   $stateParams.step;

  features.navSteps = true;

  var stepList = ['home','group','paddock','supplements','summary'];
  $scope.page = {
    back: function() {
      var prevStep = stepList.indexOf(step) -1;
      if(prevStep < 1) {
        return "#/app/home"
      }
      return "#/app/grazingSteps/"+grazType+"/"+stepList[prevStep];
    },
    next: function() {
      var nextstep = stepList.indexOf(step) +1;
      if(nextstep >= stepList.length) {
        return "#/app/home"
      }
      return "#/app/grazingSteps/"+grazType+"/"+stepList[nextstep];
    },
    step: step,
    subtitle: function() {
      var index = stepList.indexOf(step) -1;
      return [
        'Cows',
        'Grazing area',
        'Supplement',
        'Summary'
      ][index];
    },
    save: function() {
      savedcalendar.save();
      summaries.save();
      $location.path('/app/home');
    }
  };

  $scope.mobs = mobs;

  grazingplan.init(grazType);

  switch(grazType) {
    case '1aDay':
      $scope.page.title = "ONE PADDOCK A DAY";
      $scope.paddockInput = 'multiple';

      break;
    case '2aDay':
      $scope.page.title = "TWO PADDOCKS A DAY";
      $scope.paddockInput = 'multiple';

      $scope.singlePaddock = new paddock();
      $scope.updatePaddocks = function() {
        grazingplan.list.forEach(function(plan) {
          plan.paddock.cover($scope.singlePaddock.cover());
          plan.paddock.size($scope.singlePaddock.size()/2);
          plan.paddock.residual($scope.singlePaddock.residual());
        })
      };
      break;
    case '3in2Days':
      $scope.page.title = "THREE IN TWO GRAZING";
      $scope.paddockInput = 'single';

      $scope.singlePaddock = new Paddock();
      break;
    case 'winter':
      $scope.page.title = "WINTER GRAZING";
      $scope.paddockInput = 'multiple';
      break;
    default:
      break;
  }

  $scope.grazingPlan = grazingplan;

  /* defining navigation steps */
  var navSteps = {
    urls: [],
    step: stepList.indexOf(step) -1
  };
  for(var i = 1; i <= grazingplan.steps; i++) {
    navSteps.urls.push('#app/grazingSteps/'+ grazType +'/'+stepList[i]);
  }
  navSteps.names = [
    'Mob',
    'Grass',
    'Supplements',
    'Summary'
  ];
  $scope.navSteps = navSteps;
}
