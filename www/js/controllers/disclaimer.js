angular
  .module('vatFiller')
  .controller('DisclaimerController', ['disclaimer', '$state', disclaimer]);

function disclaimer(service, $state){
  var self = this;

  if(service.isAccepted()){
    $('#disclaimer-accept').hide();
  } else {
    $('#disclaimer-close').hide();
  }

  self.acceptDisclaimer = function(){
    service.accept();
    $state.go('app.startsession');
  };

  self.closeDisclaimer = function(){
    $state.go('app.about');
  };
}
