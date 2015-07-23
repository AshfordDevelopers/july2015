(function() {
    "use strict";

    angular.module("crowdResponse")
        .factory("UserBoardsService", UserBoardsService);

    UserBoardsService.$inject = [
    	"UserService",
    	"$q"
    ];

    function UserBoardsService(
    	UserService,
    	$q
    ){
	    var userBoards = {
            "1": {
            	id: "1",
                title: "My First Board",
                commentCount: 10,
                lastCommentTime: "18:34 Wed 24 June 2015",
                ownerId: "1"
            }
        };

        var hashIds = new Hashids("UserEventBoard");

        return {
        	saveNewBoard: function(board) {
        		return $q(function(resolve, reject) {
        			var date = new Date();
        			var boardId =  hashIds.encode(date.valueOf());

        			board.id = boardId;
        			userBoards[board.id] = board;
        			resolve();
        		});
        	},
        	getUserEventBoards: function() {
				return $q(function(resolve, reject) {
	            	// In future get board ids from user obj
	            	// then look up from eventBoards object
	            	resolve(userBoards);
	          	});
	        },
	        getEventBoard: function(boardId) {
	        	return $q(function(resolve, reject) {
                    resolve(userBoards[boardId]);
	        	});
	        }
        };
    }
})();
