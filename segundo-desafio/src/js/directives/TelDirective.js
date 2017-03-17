'use strict';

/**
 * Directive: Tel
 *
 * Validate telephone field. It accepts (XX)XXXX-XXXX or (XX)XXXXX-XXXX  only
 */
(function(app) {
	const TEL_REGEX = /^(\([0-9]{2}\)||[0-9]{2})[ ]?[0-9]{4}[0-9]?-?[0-9]{4}$/g; // regex to be tested

	app.directive('tel', function() {
		return{
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {
				if(ctrl && ctrl.$validators){
					ctrl.$validators.tel = function(modelValue, viewValue) {
						if(TEL_REGEX.test(viewValue)){
						console.log(TEL_REGEX.test(viewValue));

							return true;
						}
						return false;
					}
				}
				
			}
		}
	});
})(app);