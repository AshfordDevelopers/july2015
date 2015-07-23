(function() {
	"use strict";

	angular.module("crowdResponse")
		.controller("HomeCtrl", HomeCtrl);

	HomeCtrl.$inject = [
		"$scope",
		"$ionicModal",
		"LoginService",
		"UserService",
		"$state",
		"$ionicLoading"
	];

	function HomeCtrl(
		$scope,
		$ionicModal,
		LoginService,
		UserService,
		$state,
		$ionicLoading
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
				email: null,
				password: null
			};
			$scope.loginModal.show();
		};

		$scope.closeLoginModal = function() {
			$scope.loginModal.hide();
		};

		$scope.loginUser = function() {
			$ionicLoading.show({
				template: "Elves at work..."
			});

			LoginService.logIn($scope.loginData)
				.then(function(account) {
					UserService.getUserProfile(account);
					$ionicLoading.hide();
					$state.go('app.boards.myEventBoards');
					$scope.loginModal.hide();
				}, function() {
					$ionicLoading.hide();
					$scope.loginError = true;
				});
		};

		$scope.signUp = function() {
			$scope.registration = {
				fullName: null,
				email: null,
				password: null
			};

			$scope.signUpModal.show();
		};

		$scope.closeSignUpModal = function() {
			$scope.signUpModal.hide();
		};

		$scope.signUpUser = function() {
			$ionicLoading.show({
				template: "Elves at work..."
			});

			LoginService.signUpUser($scope.registration)
				.then(UserService.createProfile)
				.then(function() {
					$ionicLoading.hide();
					$scope.closeSignUpModal();
					$scope.login();
				});
		};
	}
})();
