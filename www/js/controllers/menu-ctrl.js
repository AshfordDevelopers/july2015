(function() {
	"use strict";

	angular.module("crowdResponse")
			.controller("MenuCtrl", MenuCtrl);

	MenuCtrl.$inject = [
		"$scope",
		"EventBoardsService",
		"$ionicPopup",
		"$state",
		"UserService",
		"Auth"
	];

    function MenuCtrl(
    	$scope,
    	EventBoardsService,
    	$ionicPopup,
    	$state,
    	UserService,
    	Auth
	){
		$scope.viewBoard = function() {
	  		$scope.remoteBoard = {
	  			id: null
	  		};

			// An elaborate, custom popup
			var myPopup = $ionicPopup.show({
			template: "<input type='text' ng-model='remoteBoard.id'>",
			title: "View event board",
			subTitle: "Enter the Id of the board you want to view",
			scope: $scope,
			buttons: [
			  { text: 'Cancel' },
			  {
			    text: '<b>Go!</b>',
			    type: 'button-positive',
			    onTap: function(e) {
			      if (!$scope.remoteBoard.id) {
			        //don't allow the user to close unless he enters wifi password
			        e.preventDefault();
			      } else {
			        return $scope.remoteBoard.id;
			      }
			    }
			  }
			]
			});

			myPopup.then(function(res) {
				if (res) {
					$state.go("app.boards.eventBoard", { boardId: res });
				} else {
					myPopup.close();
				}
			});
		};

		$scope.logOut = function() {
			Auth.$unauth();
			UserService.user = null;
			$state.go("home");
		};
	}
})();
