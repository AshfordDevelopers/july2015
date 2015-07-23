(function() {
	"use strict";

	angular.module("crowdResponse")
			.controller("MyEventBoardsCtrl", MyEventBoardsCtrl);

	MyEventBoardsCtrl.$inject = [
		"$scope",
		"$state",
		"userEventBoards"
	];

    function MyEventBoardsCtrl(
    	$scope,
    	$state,
    	userEventBoards
	){
		var ctrl = this;

		$scope.eventBoards = userEventBoards;

		$scope.viewBoard = function(boardId) {
			$state.go("app.boards.eventBoard", { boardId: boardId});
		};
	}
})();
		