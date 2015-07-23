(function() {
    "use strict";

    angular.module("crowdResponse")
        .factory("BoardFactory", BoardFactory);

    BoardFactory.$inject = [
    	"UserService"
    ];

    function BoardFactory(
    	UserService
    ){
    	function Board() {
    		this.title = null;
			this.commentCount = 0;
			this.lastCommentTime = null;
			this.ownerId = UserService.user.$id;
			this.subscriptions = {};
    	}

        return {
        	$create: function() {
        		return new Board();
        	}
        };
    }
})();
