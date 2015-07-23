(function() {
    "use strict";

    angular.module("crowdResponse")
        .factory("BoardCommentsService", BoardCommentsService);

    BoardCommentsService.$inject = [
    	"$q"
    ];

    function BoardCommentsService(
    	$q
    ){
    	var comments = {
    		"1": {
    			id: "1",
    			boardId: "1",
    			value: "This is soo cool",
    			createdDate: new Date(2015,6,6,12,45),
    			createdBy: "1",
                likes: {
                    "1": new Date(),
                    "2": new Date()
                }
    		},
    		"2": {
    			id: "2",
    			boardId: "1",
    			value: "I wonder when it will be done?",
    			createdDate: new Date(2015, 6, 6, 13, 10),
    			createdBy: "1",
                likes: {}
    		}
    	};

    	// temp func
    	var getComments = function(boardId) {
    		var boardComments = [];
    		for (var x in comments) {
    			if (comments[x].boardId === boardId) {
    				boardComments.push(comments[x]);
    			}
    		}

    		return boardComments;
    	};

        return {
        	getBoardComments: function(boardId) {
				return $q(function(resolve, reject) {
                    resolve(getComments(boardId));
				});
        	},
            likeComment: function(commentId, userId) {
                comments[commentId].likes[userId] = new Date();
            },
            addNewComment: function(comment) {
                return $q(function(resolve, reject) {
                    var index = Object.keys(comments).length + 1;
                    comment.id = index;
                    comments[index] = comment;
                    resolve();
                });
            }
        };
    }
})();
