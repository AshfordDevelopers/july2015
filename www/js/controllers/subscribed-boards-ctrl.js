(function() {
	"use strict";

	angular.module("crowdResponse")
		.controller("SubscribedBoardsCtrl", SubscribedBoardsCtrl);

	SubscribedBoardsCtrl.$inject = [
		"$scope",
		"$state",
		"eventBoards",
		"TimeService",
		"EventBoardsService"
	];

	function SubscribedBoardsCtrl(
		$scope,
		$state,
		eventBoards,
		TimeService,
		EventBoardsService
	) {
		$scope.$on('$ionicView.enter', function() {
			$scope.eventBoards = eventBoards;
			$scope.eventBoardUpdateTimes = {};
			for (var board in $scope.eventBoards) {
				if ($scope.eventBoards[board].lastCommentTime) {
					$scope.eventBoardUpdateTimes[board] = TimeService.timeSince($scope.eventBoards[board].lastCommentTime);
				}
			}
		});

		$scope.viewBoard = function(boardId) {
			$state.go("app.boards.eventBoard", {
				boardId: boardId
			});
		};

		$scope.refreshBoards = function() {
			EventBoardsService.getUserSubscribedBoards()
				.then(function(boards) {
					$scope.eventBoards = boards;
				});
		};
	}
})();
