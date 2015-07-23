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
		$ionicModal.fromTemplateUrl('templates/login.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.loginModal = modal;
		});

		$ionicModal.fromTemplateUrl('templates/signup.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.signUpModal = modal;
		});

		$scope.login = function() {
			$scope.loginError = false;
			$scope.loginData = {
				emailAddress: null,
				password: null
			};
			$scope.loginModal.show();
		};

		$scope.closeLoginModal = function() {
			$scope.loginModal.hide();
		};

		$scope.loginUser = function() {
			LoginService.logIn($scope.loginData)
				.then(function(account) {
					UserService.getUserProfile(account);
					$state.go('app.dashboard');
					$scope.loginModal.hide();
				}, function() {
					$scope.loginError = true;
				});
		};

		$scope.signUp = function() {
			$scope.registration = {
				fullName: null,
				emailAddress: null,
				password: null
			};

			$scope.signUpModal.show();
		};

		$scope.closeSignUpModal = function() {
			$scope.signUpModal.hide();
		};

		$scope.signUpUser = function() {
			LoginService.signUpUser($scope.registration)
				.then(UserService.createProfile)
				.then(function() {
					$scope.closeSignUpUser();
					$scope.login();
				});
		};
	}
})();
