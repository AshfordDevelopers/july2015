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
		"$ionicHistory",
		"$filter"
	];

	function EventBoardCtrl(
		$scope,
		$ionicPopup,
		comments,
		eventBoard,
		BoardCommentsService,
		UserService,
		$ionicHistory,
		$filter
	) {

		var orderCommentsByLikes = function(comments) {
			return $filter("orderBy")(comments, function(comment) {
				if (comment.hasOwnProperty("likes")) {
					return Object.keys(comment.likes).length;	
				} else {
					return 0;
				}
			}, true);
		};

		$scope.comments = orderCommentsByLikes(comments);
		$scope.eventBoard = eventBoard;
		if ($scope.eventBoard) {
			$scope.boardDetail = {
				subscribed: (UserService.user.subscriptions.hasOwnProperty($scope.eventBoard.id)) ? true : false,
				isOwner: ($scope.eventBoard.ownerId === UserService.user.uid) ? true : false
			};

			$scope.$watch("boardDetail.subscribed", function(subscribed) {
				if (UserService.user.hasOwnProperty("subscriptions")) {
					var alreadySubscribed = UserService.user.subscriptions.hasOwnProperty($scope.eventBoard.id);
					if (subscribed && !alreadySubscribed) {
						UserService.subscribeToBoard($scope.eventBoard.id);
					} else if (!subscribed && alreadySubscribed) {
						UserService.unsubscribeFromBoard($scope.eventBoard.id);
					}
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

		$scope.refreshComments = function() {
			BoardCommentsService.getBoardComments($scope.eventBoard.id)
				.then(function(comments) {
					$scope.comments = orderCommentsByLikes(comments);
					$scope.$broadcast('scroll.refreshComplete');
				});
		};

		$scope.showBoardLink = function() {
			$ionicPopup.alert({
				title: "Get people talking!",
				template: "<p>Here's your unique event board Id:</p><p style=\"text-align: center;\">" + $scope.eventBoard.id + "</p>"
			});
		};

		$scope.newCommentPopUp = function() {
			$scope.newComment = {
				boardId: $scope.eventBoard.id,
				value: null,
				createdDate: new Date().getTime(),
				createdBy: UserService.user.uid,
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
					BoardCommentsService.addNewComment($scope.newComment, $scope.eventBoard.commentCount)
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
