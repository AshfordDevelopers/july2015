(function() {
	"use strict";

	angular.module("crowdResponse")
		.controller("HomeCtrl", HomeCtrl);

	HomeCtrl.$inject = [
		"$scope",
		"$ionicModal",
		"LoginService",
		"UserService",
		"$state"
	];

	function HomeCtrl(
		$scope,
		$ionicModal,
		LoginService,
		UserService,
		$state
	) {


		// $scope.loginUser = function() {
		// 	LoginService.logIn($scope.loginData)
		// 		.then(function(account) {
		// 			UserService.getUserProfile(account);
		// 			console.log("Logged in");
		// 			$scope.loginModal.hide();
		// 		}, function() {
		// 			$scope.loginError = true;
		// 		});
		// };

		// $scope.signUpUser = function() {
		// 	LoginService.signUpUser($scope.registration)
		// 		.then(UserService.createProfile)
		// 		.then(function() {
		// 			$scope.closeSignUpUser();
		// 			$scope.login();
		// 		});
		// };
	}
})();
