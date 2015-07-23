(function() {
	'use strict';
	angular.module('crowdResponse')
		.config(Config);

	Config.$inject = [
		'$stateProvider',
		'$urlRouterProvider'
	];

	function Config(
		$stateProvider,
		$urlRouterProvider
	) {
		$stateProvider

			.state("home", {
				url: "/home",
				controller: "HomeCtrl",
				templateUrl: "templates/home.html"
			});

		// if none of the above states are matched, use this as the fallback
		// Set to login just to make dev easier for the moment
		$urlRouterProvider.otherwise('/home');
	}
})();