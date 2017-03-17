'use strict';

/**
 * Directive: Email
 *
 * Validate email field. It accepts [letters | numbers | . | - | @ | _]
 */
 (function(app) {
  app.directive('overwriteEmail', function() {
    var EMAIL_REGEXP = /^^[\w\d\.\-\_]+@[\w\d\-\_]+\.[\w\d\-\_]+(\.[\w\d\-\_]+)?$/i;

    return {
      require: '?ngModel',
      link: function(scope, elm, attrs, ctrl) {
      // only apply the validator if ngModel is present and AngularJS has added the email validator
      if (ctrl && ctrl.$validators.email) {

        // this will overwrite the default AngularJS email validator
        ctrl.$validators.email = function(modelValue) {
          return EMAIL_REGEXP.test(modelValue);
        };
      }
    }
  };
});
})(app);