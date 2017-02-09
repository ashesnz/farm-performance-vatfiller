angular.module('vatFiller')
  .factory('summaries', ['grazingplan', function(grazingplan) {
    var summaries={};
    var load = function() {
      summaries = JSON.parse(window.localStorage.getItem('summaries'));
      if(summaries == undefined) { // if summaries variable do not exist
        summaries = {};
      }
    };
    load();

    return {
      save: function() {
        var d = new Date();
        summaries[grazingplan.summaryName] = {
          plan: grazingplan._toJSON(),
          date: d.toLocaleDateString()
        };
        localStorage.setItem('summaries', JSON.stringify(summaries));
      },
      get: function() {
        return summaries;
      }
    };

  }]);
