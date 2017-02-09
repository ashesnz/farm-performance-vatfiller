angular.module('vatFiller')
  .factory('summaries', ['grazingplan', 'woopratracking', function(grazingplan, woopratracking) {
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

        var latestsummary = summaries[grazingplan.summaryName] = {
          plan: JSON.stringify(grazingplan._toJSON()),
          date: d.toLocaleDateString()
        };

        localStorage.setItem('summaries', JSON.stringify(latestsummary));

        woopratracking.trackDecision('Summary', latestsummary);
      },
      get: function() {
        return summaries;
      }
    };

  }]);
