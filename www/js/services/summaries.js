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
        var summaries = get();
        if (!summaries) {
          summaries = [];
        }

        summaries.push({
          plan: JSON.stringify(grazingplan._toJSON()),
          name: grazingplan.summaryName
        });



       // woopratracking.trackDecision('Summary', summaries);
      },
      get: function() {
        return JSON.parse(window.localStorage.getItem('summaries'));
      },

      set: function(value) {
        localStorage.setItem('summaries', JSON.stringify(value));
      }
    };

  }]);
