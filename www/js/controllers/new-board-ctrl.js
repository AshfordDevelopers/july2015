(function() {
	"use strict";

	angular.module("crowdResponse")
			.controller("NewBoardCtrl", NewBoardCtrl);

	NewBoardCtrl.$inject = [
		"$scope",
		"UserBoardsService",
		"$state",
		"BoardFactory"
	];

    function NewBoardCtrl(
    	$scope,
    	UserBoardsService,
    	$state,
    	BoardFactory
	){
		var ctrl = this;
		ctrl.helloWorld = function() {
			console.log("Hello World");
		};

		$scope.board = BoardFactory.$create();

		$scope.save = function() {
			UserBoardsService.saveNewBoard($scope.board)
				.then(function() {
					$state.go("app.boards.myEventBoards");
				});
		}
	}
})();
