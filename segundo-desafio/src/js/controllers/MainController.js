'use strict';

(function(app){
	app.controller('MainController', ['$scope', function($scope){
		$scope.show_contacts = false; // controls contacts list display
		$scope.contacts = []; // contacts list
		$scope.contact = {};

		/**
		 * if form is valid push contact to the contact list.
		 * @param  form 
		 * @param  contact
		 * @return void
		 */
		$scope.save = function(form, contact){
			$scope.makeTelMask(form, contact);

			if(form && contact && form.$valid){
				$scope.contacts.push(angular.copy(contact));
				$scope.show_contacts = true;
				console.log($scope.contacts)
			} else{
				angular.forEach(form.$error, function (field) {
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					})
				});
			}
		}

		/**
		 * Clear form.
		 * @param  form
		 * @return void
		 */
		$scope.reset = function (form, contact) {
			if (form) {
				var fields = form.$$controls; // form fields controllers

				// reset fields and render
				for(var i = 0, j = fields.length; i < j; i++){
					fields[i].$setViewValue();
					fields[i].$render();
				}

				form.$setPristine();
				form.$setUntouched();
			}
		};

		/**
		 * return to form screen
		 * @return void
		 */
		$scope.goBack = function () {
			$scope.show_contacts = false;
		}

		/**
		 * Mask telephone field
		 * @param  form 
		 * @param  contact if it exists, we are saving the form
		 * @return void
		 */
		$scope.makeTelMask = function (form, contact) {
			var digits = /[0-9]+/; // regex to get the tel's digits

			if (!form.ctel.$invalid && $scope.contact.tel && $scope.contact.tel !== '') {
				var tel_digits = "";
				var tel = (contact) ? contact.tel : $scope.contact.tel;
				var size = tel.length;
				var hifen = -1;

				for (var i = 0; i < size; i++) {
					if (digits.test(tel[i])) { 
						tel_digits += tel[i]; // if char is a digit push on
					}
				}

				size = tel_digits.length;

				switch (size) {
					case 8:
						hifen = 3;
						break;
					case 9:
						hifen = 4;
						break;
					case 10:
						hifen = 5;
						break;
					case 11:
						hifen = 6;
				}

				if (hifen > 0){
					tel_digits = tel_digits.slice(0, hifen + 1) + '-' + tel_digits.slice(hifen + 1);
				}
				
				if (size > 9) { // if it contains DDD
					tel_digits = '(' + tel_digits.slice(0, 2) + ') ' + tel_digits.slice(2);
				}

				$scope.tel = tel_digits;
				if(contact)
					contact.tel = tel_digits;
				form.ctel.$setViewValue($scope.tel);
				form.ctel.$render();
			}
		}
	}]);
})(app);