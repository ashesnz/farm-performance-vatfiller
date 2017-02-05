angular.module('vatFiller')
  .factory('savedcalendar', ['grazingplan', function(grazingplan) {
    var calendar;
    var load = function() {
      calendar = JSON.parse(window.localStorage.getItem('calendar'));
      if(calendar == undefined) {
        calendar = {};
      }
    };
    load();

    return {
      save: function() {
        var d = new Date();
        var year = d.getFullYear();
        if(!calendar.hasOwnProperty(year)) {
          calendar[year] = {};
        }
        var month = d.getMonth();
        if(!calendar[year].hasOwnProperty(month)) {
          calendar[year][month] = {};
        }
        var day = d.getDate();
        if(!calendar[year][month].hasOwnProperty(day)) {
          calendar[year][month][day] = {};
        }
        calendar[year][month][day][grazingplan.mob().name()] = this._formatData();
        localStorage.setItem('calendar', JSON.stringify(calendar));
      },
      _formatData: function() {
        return grazingplan._toJSON();
      },
      get: function() {
        return calendar;
      },
      importFromDate: function(year,month,day) {
        /*console.log('FIX THIS METHOD.... WAS NOT UPDATED WHEN HERD WAS REPLACED BY GROUPS...');
        if( calendar.hasOwnProperty(year)
          &&  calendar[year].hasOwnProperty(month)
          &&  calendar[year][month].hasOwnProperty(day)) {
          var data = calendar[year][month][day];
          Mob._fromJSON(data.mob);
          grazingplan._fromJSON(data.feedPlans);
          return data;
        } else {
          return false;
        }*/
      }
    };

  }]);
