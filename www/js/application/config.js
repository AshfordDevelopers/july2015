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
						return UserService.getUserProfile({uid: "1"});
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
					userEventBoards: ["user", "UserBoardsService", function(user, UserBoardsService) {
						return UserBoardsService.getUserEventBoards();
					}]
				}
			})

			.state("app.boards.eventBoard", {
				url: "/:boardId",
				views: {
					"boardContent": {
						templateUrl: "templates/event-board.html",
						controller: "EventBoardCtrl"
					}
				},
				resolve: {
					comments: ["BoardCommentsService", "$stateParams", function(BoardCommentsService, $stateParams) {
						return BoardCommentsService.getBoardComments($stateParams.boardId);
					}],
					eventBoard: ["UserBoardsService", "$stateParams", function(UserBoardsService, $stateParams) {
						return UserBoardsService.getEventBoard($stateParams.boardId);
					}]
				}
			})

			.state('app.boards.newBoard', {
				url: "/newBoard",
				views: {
					"boardContent": {
						templateUrl: "templates/new-board.html",
						controller: "NewBoardCtrl"
					}
				}

			});

		// if none of the above states are matched, use this as the fallback
		// Set to login just to make dev easier for the moment
		$urlRouterProvider.otherwise('/home');
	}
})();