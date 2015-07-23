(function() {
    "use strict";

    angular.module("crowdResponse")
        .directive("commentCard", commentCard);

    commentCard.$inject = [
    	"UserService",
    	"TimeService",
    	"BoardCommentsService"
    ];

    function commentCard(
    	UserService,
    	TimeService,
    	BoardCommentsService
    ){
        return {
            restrict: "E", // A, E, C
            templateUrl: "templates/comment-card.html",
            scope: {
            	comment: "="
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
            		scope.likeCount = Object.keys(scope.comment.likes).length;
            		scope.commentLiked = scope.comment.likes.hasOwnProperty(UserService.user.$id);
            	};

            	scope.likeComment = function() {
            		BoardCommentsService.likeComment(scope.comment.id, UserService.user.$id);
            		calculateLikeInfo();
            	};

            	calculateLikeInfo();
            }
        };
    }
})();
