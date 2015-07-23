(function() {
    "use strict";

    angular.module("crowdResponse")
        .directive("commentCard", commentCard);

    commentCard.$inject = [
        "UserService",
        "TimeService",
        "BoardCommentsService",
        "$ionicLoading"
    ];

    function commentCard(
        UserService,
        TimeService,
        BoardCommentsService,
        $ionicLoading
    ) {
        return {
            restrict: "E", // A, E, C
            templateUrl: "templates/comment-card.html",
            scope: {
                comment: "=",
                onDelete: "&"
            },
            link: function(scope, element, attrs, ngModelController) {
                UserService.findUserProfile(scope.comment.createdBy)
                    .then(function(user) {
                        scope.commentCreator = user.fullName;
                    });

                scope.timeSinceCreation = TimeService.timeSince(scope.comment.createdDate) + " ago";
                scope.commentLiked = false;
                scope.likeCount = 0;

                var calculateLikeInfo = function() {
                    if (!scope.comment.hasOwnProperty("likes")) {
                        scope.comment.likes = {};
                    }
                    scope.likeCount = Object.keys(scope.comment.likes).length;
                    scope.commentLiked = scope.comment.likes.hasOwnProperty(UserService.user.uid);
                    scope.canDelete = scope.comment.createdBy === UserService.user.uid;
                };

                scope.likeComment = function() {
                    BoardCommentsService.likeComment(scope.comment.$id, UserService.user.uid)
                        .then(function(updatedComment) {
                            scope.comment = updatedComment;
                            calculateLikeInfo();
                        });
                };

                scope.deleteComment = function() {
                    $ionicLoading.show({
                        template: "Elves at work..."
                    });
                    BoardCommentsService.deleteComment(scope.comment.$id)
                        .then(function() {
                            scope.onDelete();
                            $ionicLoading.hide();
                        });
                };

                calculateLikeInfo();
            }
        };
    }
})();
