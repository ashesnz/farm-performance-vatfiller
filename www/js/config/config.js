angular.module('vatFiller')
  .constant('version', "0.2.1")
  .constant('features', {
    "widgets": {
      "calculator": true,
      "feedQuality": true,
      "wastage": true,
      "stepsNav": true,
      "stepsSubtitles": false,
      "activityTracing": true,
      "decisionTracing": true,
      "intakeCalculator": true
    },
    "pages": {
      "calendar": false,
      "winterGrazing": false,
      "grazingType3": false,
      "about": true,
      "summaries": true,
      "feedback": true
    }
  })
  .constant('debug',{
    "trace": false
  });
