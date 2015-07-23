(function() {
	"use strict";

	angular.module("crowdResponse")
			.controller("NewBoardCtrl", NewBoardCtrl);

	NewBoardCtrl.$inject = [
		"$scope",
		"EventBoardsService",
		"$state"
	];

    function NewBoardCtrl(
    	$scope,
    	EventBoardsService,
    	$state
	){
		$scope.board = EventBoardsService.$create();

		$scope.save = function() {
			EventBoardsService.saveNewBoard($scope.board)
				.then(function() {
					$state.go("app.boards.myEventBoards");
				});
		}
	}
})();
