/*jslint browser: true*/ /*global angular Code*/

// Shared access to the current animal_id

angular
  .module('vatFiller')
  .factory('manifest', ['$ionicPopup', '$ionicLoading', function($ionicPopup, $ionicLoading) {

    /**
     * @description
     * Callback for updateReady event.
     * Opens an Ionic Popup that asks the use if he/she wants to update the app now.
     */
    function onUpdateReady() {
      $ionicLoading.hide();
      var confirmPopup = $ionicPopup.confirm({
        title: 'Application Update',
        template: 'A new version of this app is available. Update now?',
        buttons: [
          {
            text: 'Cancel',
            type: 'button-positive'
          },
          {
            text: 'OK',
            type: 'button-calm',
            onTap: function() { return true; }
          }
        ]
      });
      confirmPopup.then(function(res) {
        if(res) {
          $ionicLoading.show({
            template: 'Loading updates...'
          });
          window.location.reload();
        } else {
        }
      });
    }
    /**
     * @description
     * Callback for noUpdate event.
     * Displays a status message that fades away.
     */
    function onNoUpdate() {
      $ionicLoading.hide();
      $ionicLoading.show({
        template: 'No updates available.',
        duration: 1000
      });
    }
    /**
     * @description
     * Callback for error event.
     * Displays a status message that fades away.
     */
    function onError() {
      $ionicLoading.hide();
      $ionicLoading.show({
        template: 'An error occurred while looking for updates.',
        duration: 1000
      });
    }
    /**
     * @description
     * Callback for checking event.
     * Displays the current status.
     */
    function onChecking() {
      $ionicLoading.hide();
      $ionicLoading.show({
        template: 'Checking for updates...',
        duration: 2000
      });
    }
    /**
     * @description
     * Callback for downloading event.
     * Displays the current status.
     */
    function onDownloading() {
      $ionicLoading.hide();
      $ionicLoading.show({
        template: 'Downloading updates...'
      });
    }
    /**
     * @description
     * Callback for progress event
     */
    function onProgess() {}
    /**
     * @description
     * Callback for cached event.
     * Hides latest message.
     */
    function onCached() {
      $ionicLoading.hide();
    }
    /**
     * @description
     * Callback for obsolete event.
     * Hides latest message.
     */
    function onObsolete() {
      $ionicLoading.hide();
      window.location = './'
    }


    return {
      /**
       * @memberOf module:'lic.ionic.manifest'~Manifest
       * @description
       * Initialises HTML Manifest event listeners.
       * Initialises the event listeners related to the application cache
       * (onChecking, onError, onNoUpdate, etc.).
       * To be called ideally in your main controller.
       */
      initListeners: function() {
        window.applicationCache.addEventListener('checking', onChecking);
        window.applicationCache.addEventListener('error', onError);
        window.applicationCache.addEventListener('noupdate', onNoUpdate);
        window.applicationCache.addEventListener('downloading', onDownloading);
        window.applicationCache.addEventListener('progress', onProgess);
        window.applicationCache.addEventListener('updateready', onUpdateReady);
        window.applicationCache.addEventListener('cached', onCached);
        window.applicationCache.addEventListener('obsolete', onObsolete);
      },
      /**
       * @memberOf module:'lic.ionic.manifest'~Manifest
       * @description
       * Checks for updates and download updates if available.
       * Actively checks if there are any updates of the HTML manifest
       * (window.applicationCache.update() query) and download the updates if they are available.
       * This will trigger the relevant events and behaviors if initListeners() have been called.
       * Method to attach to a "check for update" button.
       */
      checkForUpdates: function() {
        if(window.applicationCache.status == window.applicationCache.UPDATEREADY) {
          onUpdateReady();
        } else {
          window.applicationCache.update();
        }
      },
      /**
       * @memberOf module:'lic.ionic.manifest'~Manifest
       * @description
       * Checks if the updates are ready to be loaded.
       * This does not trigger a (window.applicationCache.update() query).
       * To be called when loading the app to see if any update is available.
       */
      checkStatus: function() {
        if(window.applicationCache.status == window.applicationCache.UPDATEREADY) {
          onUpdateReady();
        }
      }
    }
  }]);
