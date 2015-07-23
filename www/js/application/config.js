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
			})

			.state('app', {
				url: "/app",
				abstract: true,
				templateUrl: "templates/menu.html",
				controller: "MenuCtrl",
				resolve: {
					user: ["UserService", function(UserService) {
						return UserService.getUserAccount;
					}]
				}
			})

			.state('app.dashboard', {
				url: "/dashboard",
				views: {
					'menuContent': {
						templateUrl: "templates/dashboard.html"
				  	}
				}
			})

			.state("app.boards", {
				url: "/boards",
				views: {
					"menuContent": {
						templateUrl: "templates/boards.html"
					}
				},
				abstract: true
			})

			.state('app.boards.myEventBoards', {
				url: "/myEventBoards",
				views: {
					'boardContent': {
						templateUrl: "templates/my-event-boards.html",
						controller: "MyEventBoardsCtrl"
				  	}
				},
				resolve: {
					userEventBoards: ["UserBoardsService", function(UserBoardsService) {
						return UserBoardsService.getUserEventBoards();
					}]
				}
			});

		// if none of the above states are matched, use this as the fallback
		// Set to login just to make dev easier for the moment
		$urlRouterProvider.otherwise('/home');
	}
})();