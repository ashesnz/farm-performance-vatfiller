angular
  .module('vatFiller')
  .service('disclaimer', [disclaimer]);

function disclaimer(){
  var self = this;

  self.disclaimer_version = '0.1'

  self.isAccepted = function(){
    if(window.localStorage.getItem('disclaimer_accepted_' + self.disclaimer_version)) {
      return window.localStorage.getItem('disclaimer_accepted_' + self.disclaimer_version) === 'true';
    }
    return false;
  };

  self.accept = function(){
    window.localStorage['disclaimer_accepted_' + self.disclaimer_version] = true;
  };

  self.decline = function(){
    window.localStorage['disclaimer_accepted_' + self.disclaimer_version] = false;
  };
}

