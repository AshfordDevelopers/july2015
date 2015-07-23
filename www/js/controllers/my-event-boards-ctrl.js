(function() {
	"use strict";

	angular.module("crowdResponse")
		.controller("MyEventBoardsCtrl", MyEventBoardsCtrl);

	MyEventBoardsCtrl.$inject = [
		"$scope",
		"$state",
		"eventBoards",
		"TimeService",
		"$ionicPopup",
		"BoardCommentsService",
		"EventBoardsService",
		"$ionicLoading"
	];

	function MyEventBoardsCtrl(
		$scope,
		$state,
		eventBoards,
		TimeService,
		$ionicPopup,
		BoardCommentsService,
		EventBoardsService,
		$ionicLoading
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
			EventBoardsService.getUserEventBoards()
				.then(function(boards) {
					$scope.eventBoards = boards;
				});
		};

		$scope.deleteBoard = function(e, boardId) {
			e.stopPropagation();
			var confirmPopup = $ionicPopup.confirm({
				title: "Delete Board",
				template: "Are you sure you want to delete '" + $scope.eventBoards[boardId].title + "'?"
			});
			confirmPopup.then(function(res) {
				if (res) {
					$ionicLoading.show({
						template: "Elves at work"
					});
					console.log('You are sure');
					BoardCommentsService.deleteAllBoardComments(boardId)
						.then(EventBoardsService.deleteBoard(boardId))
						.then(function() {
							$scope.refreshBoards();
							$ionicLoading.hide();
						});
				}
			});
		};
	}
})();
