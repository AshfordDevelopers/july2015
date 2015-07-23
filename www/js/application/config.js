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
				cache: false,
				resolve: {
					auth: ["Auth", function(Auth) {
						return Auth.$waitForAuth();
					}],
					user: ["auth", "UserService", function(auth, UserService) {
						// console.log(auth);
						return UserService.getUserProfile(auth);
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
				cache: false,
				views: {
					'boardContent': {
						templateUrl: "templates/my-event-boards.html",
						controller: "MyEventBoardsCtrl"
				  	}
				},
				resolve: {
					eventBoards: ["user", "EventBoardsService", function(user, EventBoardsService) {
						return EventBoardsService.getUserEventBoards();
					}]
				}
			})

			.state('app.boards.subscribedBoards', {
				url: "/subscribedBoards",
				cache: false,
				views: {
					'boardContent': {
						templateUrl: "templates/subscribed-boards.html",
						controller: "SubscribedBoardsCtrl"
				  	}
				},
				resolve: {
					eventBoards: ["user", "EventBoardsService", function(user, EventBoardsService) {
						return EventBoardsService.getUserSubscribedBoards();
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
					comments: ["user", "BoardCommentsService", "$stateParams", function(user, BoardCommentsService, $stateParams) {
						return BoardCommentsService.getBoardComments($stateParams.boardId);
					}],
					eventBoard: ["EventBoardsService", "$stateParams", function(EventBoardsService, $stateParams) {
						return EventBoardsService.getEventBoard($stateParams.boardId);
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