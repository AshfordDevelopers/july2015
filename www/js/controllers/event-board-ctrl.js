(function() {
	"use strict";

	angular.module("crowdResponse")
		.controller("EventBoardCtrl", EventBoardCtrl);

	EventBoardCtrl.$inject = [
		"$scope",
		"$ionicPopup",
		"comments",
		"eventBoard",
		"BoardCommentsService",
		"UserService",
		"$ionicHistory"
	];

	function EventBoardCtrl(
		$scope,
		$ionicPopup,
		comments,
		eventBoard,
		BoardCommentsService,
		UserService,
		$ionicHistory
	) {

		$scope.comments = comments;
		$scope.eventBoard = eventBoard;
		if ($scope.eventBoard) {
			$scope.boardDetail = {
				subscribed: (UserService.user.subscriptions.hasOwnProperty($scope.eventBoard.id)) ? true : false,
				isOwner: ($scope.eventBoard.ownerId === UserService.user.$id) ? true : false
			};

			$scope.$watch("boardDetail.subscribed", function(subscribed) {
				var alreadySubscribed = UserService.user.subscriptions.hasOwnProperty($scope.eventBoard.id);
				if (subscribed && !alreadySubscribed) {
					UserService.subscribeToBoard($scope.eventBoard.id);
				} else if (!subscribed && alreadySubscribed) {
					UserService.unsubscribeFromBoard($scope.eventBoard.id);
				}
			});
		} else {
			$ionicPopup.alert({
				title: 'Event Board Not Found',
				template: 'No event was found with the supplied Id',
				cssClass: "error-popup"
			})
				.then(function(res) {
					$ionicHistory.goBack();
				});
		}

		// $scope.refreshComments = function() {
		// 	BoardCommentsService.getBoardComments($scope.eventBoard.id)
		// 		.then(function(comments) {
		// 			$scope.comments = comments;
		// 			$scope.$broadcast('scroll.refreshComplete');
		// 		});
		// };

		$scope.newCommentPopUp = function() {
			$scope.newComment = {
				id: null,
				boardId: $scope.eventBoard.id,
				value: null,
				createdDate: new Date(),
				createdBy: UserService.user.$id,
				likes: {}
			};

			// An elaborate, custom popup
			var myPopup = $ionicPopup.show({
				template: "<input type='text' ng-model='newComment.value'>",
				title: "New Comment",
				subTitle: "What's on your mind?",
				scope: $scope,
				buttons: [
					{
						text: 'Cancel'
					},
					{
						text: '<b>Save</b>',
						type: 'button-positive',
						onTap: function(e) {
							if (!$scope.newComment.value) {
								//don't allow the user to close unless he enters wifi password
								e.preventDefault();
							} else {
								return $scope.newComment.value;
							}
						}
					}
				]
			});

			myPopup.then(function(res) {
				if (res) {
					BoardCommentsService.addNewComment($scope.newComment)
						.then(function() {
							$scope.refreshComments();
						});
				} else {
					myPopup.close();
				}

			});
		};
	}
})();
