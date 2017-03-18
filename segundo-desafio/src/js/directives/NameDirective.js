'use strict';

/**
 * Directive: Name
 *
 * Validate name field. It returns false to special characters and numbers
 */
(function(app) {
	var NAME_REGEX = /^[a-z ]+$/i; // regex to be tested

	app.directive('letters', function() {
		return{
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {
				if(ctrl && ctrl.$validators){
					ctrl.$validators.letters = function(modelValue, viewValue) {
						if(NAME_REGEX.test(viewValue)){
							return true;
						}
						return false;
					}
				}
			}
		}
	});
})(app);