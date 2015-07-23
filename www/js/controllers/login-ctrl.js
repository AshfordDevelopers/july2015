(function() {
	"use strict";

	angular.module("crowdResponse")
			.controller("LoginCtrl", LoginCtrl);

	LoginCtrl.$inject = [
		'$scope',
		'$state',
		'UserService',
		"LoginService"
	];

    function LoginCtrl(
    	$scope,
    	$state,
    	UserService,
    	LoginService
	){
		$scope.loginData = {
			emailAddress: null,
			password: null
		};

		$scope.loginError = false;

		$scope.loginUser = function() {
			LoginService.logIn($scope.loginData)
				.then(function(account) {
					UserService.getUserProfile(account);
					$state.go('app.dashboard');
				}, function() {
					$scope.loginError = true;
				});
		};
	}
})();
