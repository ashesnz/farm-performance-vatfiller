angular.module('vatFiller')

  .factory('woopratracking', ['version', 'features', 'debug', 'grazingplan', '$http', '$timeout', '$ionicGesture',
    function(version, features, debug, grazingplan, $http, $timeout, $ionicGesture) {

    var debug = (function () {
      if(debug.trace) {
        return console.log.bind(console);
      } else {
        return function() {};
      }
    })();

    /* COLLECTING THE TRACE */
    var collector = function (e) {
      var attr = {};
      attr.url = document.location.href;
      attr.screenWidth = document.documentElement.clientWidth;
      attr.screenHeight = document.documentElement.clientHeight;
      attr.pageX = e.pageX;
      attr.pageY = e.pageY;
      attr.clientX = e.clientX;
      attr.clientY = e.clientY;
      attr.screenX = e.screenX;
      attr.screenY = e.screenY;
      /*
       if(typeof(e.target.id) !== "undefined" && e.target.id !== "") {
       attr.id = e.target.id;
       }
       */
      attr.tagName = e.target.tagName;
      switch (e.type) {
        case 'click':
        case 'focusin':
          switch(attr.tagName) {
            case 'INPUT':
              attr.name = e.target.name;
              attr.value = e.target.value;
              break;
            case 'BUTTON':
              attr.innerHTML = e.target.innerHTML;
              break;
            default:
              break;
          }
          break;
        case 'keyup':
          attr.key = String.fromCharCode(e.keyCode);
          attr.keyCode = e.keyCode;
          attr.ctrlKey = e.ctrlKey;
          attr.altKey = e.altKey;
          attr.shiftKey = e.shiftKey;
          attr.selectionStart = e.target.selectionStart;
          attr.selectionEnd = e.target.selectionEnd;
          break;
        default:
          break;
      }
      debug("collecting", e.type);
    //  woopra.track(e.type, attr);

    };

    return {
      trackDecision: function(nameOfDecision, decisionObject) {
        woopra.track(nameOfDecision, decisionObject);
      },

      initWoopra: function() {
        (function(){
          var t,i,e,n=window,o=document,a=arguments,s="script",r=["config","track","identify","visit","push","call","trackForm","trackClick"],c=function(){var t,i=this;for(i._e=[],t=0;r.length>t;t++)(function(t){i[t]=function(){return i._e.push([t].concat(Array.prototype.slice.call(arguments,0))),i}})(r[t])};for(n._w=n._w||{},t=0;a.length>t;t++)n._w[a[t]]=n[a[t]]=n[a[t]]||new c;i=o.createElement(s),i.async=1,i.src="//static.woopra.com/js/w.js",e=o.getElementsByTagName(s)[0],e.parentNode.insertBefore(i,e)
        })("woopra");

        if (window.location.host == 'farmperformance.agrimetrics.co.nz') {
          woopra.config({ domain: 'vatfiller.agrimetrics.co.nz' });
        } else {
          woopra.config({ domain: 'dev.vatfiller.agrimetrics.co.nz' });
        }

      //  woopra.track();

        $(document).on('click', collector);
        $(document).on('change', 'input', collector);

        var element = angular.element(document.querySelector('body'));

        $ionicGesture.on('swipeup',collector,element);
        $ionicGesture.on('swipedown',collector,element);
        $ionicGesture.on('swipeleft',collector,element);
        $ionicGesture.on('swiperight',collector,element);
        // */

        //$(window).load(Trace.collector);
        $(window).unload(collector);



      }

    };
  }]);
