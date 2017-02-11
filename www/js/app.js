// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('vatFiller', ['ionic', 'vatFiller.controllers', 'ionic-material'])



.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.home', {
      url: '/home',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html'
        }
      }
    })

    .state('app.about', {
      url: "/about",
      views: {
        'menuContent': {
          templateUrl: "templates/about.html",
          controller: "AboutController"
        }
      }
    })
    .state('app.feedback', {
      url: "/feedback",
      views: {
        'menuContent': {
          templateUrl: "templates/feedback.html",
          controller: "FeedbackController"
        }
      }
    })


   .state('app.summary', {
          url: '/summary',
          views: {
            'menuContent': {
              templateUrl: 'templates/summary.html',
              controller: 'SummaryController'
            }
          }
    })

    .state('app.settings', {
      url: "/settings",
      views: {
        'menuContent': {
          templateUrl: "templates/settings.html",
          controller: "SettingsController"
        }
      }
    })

    .state('app.settingsMobs', {
      url: "/settingsMobs",
      views: {
        'menuContent': {
          templateUrl: "templates/settingsMobs.html",
          controller: "SettingsMobsController"
        }
      }
    })

    .state('app.settingsPaddocks', {
      url: "/settingsPaddocks",
      views: {
        'menuContent': {
          templateUrl: "templates/settingsPaddock.html",
          controller: "SettingsPaddockController"
        }
      }
    })

    .state('app.settingsSupplements', {
      url: "/settingsSupplements",
      views: {
        'menuContent': {
          templateUrl: "templates/settingsSupplements.html",
          controller: "SettingsSupplementsController"
        }
      }
    })

    .state('app.settingsWastage', {
      url: "/settingsWastage",
      views: {
        'menuContent': {
          templateUrl: "templates/settingsWastage.html",
          controller: "SettingsWastageController"
        }
      }
    })

    .state('app.stepgrazing', {
      url: "/grazingSteps/:grazType/:step",
      views: {
        'menuContent': {
          templateUrl: "templates/grazing.html",
          controller: 'GrazingController'
        }
      }
    });




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})
.run(function($ionicPlatform, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

   if(window.navigator.standalone) {
      angular.element(document.getElementsByTagName('body')).prepend('<div class="iPhoneTopBar"></div>');
   }
  });
});
