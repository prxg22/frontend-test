'use strict';

(function(app){
	app.controller('MainController', ['$scope', function($scope){
		$scope.show_contacts = false; // controls contacts list display
		$scope.contacts = []; // contacts list

		/**
		 * if form is valid push contact to the contact list.
		 * @param  form 
		 * @param  contact
		 * @return void
		 */
		 $scope.save = function(form, contact){
		 	console.log(form);
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
		 $scope.reset = function (form) {
		 	if (form) {
		 		form.$setPristine();
		 		form.$setUntouched();
		 	}			
		 	$scope.contact = {};
		 };

		 /**
		  * return to form screen
		  * @return void
		  */
		 $scope.goBack = function () {
		 	$scope.show_contacts = false;
		 }
	}]);
})(app);