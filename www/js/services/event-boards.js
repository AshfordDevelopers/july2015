(function() {
    "use strict";

    angular.module("crowdResponse")
        .factory("EventBoardsService", EventBoardsService);

    EventBoardsService.$inject = [
        "UserService",
        "$q"
    ];

    function EventBoardsService(
        UserService,
        $q
    ) {
        var ref = new Firebase(crowdResponseHosts.firebase).child("eventBoards");

        // Key for hashes
        var hashIds = new Hashids("EventBoard");

        function Board() {
            this.title = null;
            this.commentCount = 0;
            this.lastCommentTime = null;
            this.ownerId = UserService.user.uid;
            this.subscriptions = {};
        }

        return {
            $create: function() {
                return new Board();
            },
            saveNewBoard: function(board) {
                return $q(function(resolve, reject) {
                    var date = new Date();
                    var boardId = hashIds.encode(date.valueOf());

                    board.id = boardId;

                    ref.child(boardId).set(board, resolve);
                });
            },
            getUserEventBoards: function() {
                return $q(function(resolve, reject) {
                    ref.orderByChild("ownerId")
                        .startAt(UserService.user.uid)
                        .endAt(UserService.user.uid)
                        .once("value", function(snapshot) {
                            resolve(snapshot.val());
                        });
                });
            },
            getUserSubscribedBoards: function() {
                return $q(function(resolve, reject) {
                    ref.once("value", function(eventBoards) {
                        if (UserService.user.hasOwnProperty("subscriptions")) {
                            var subscribedBoards = {};
                            for ( var boardId in UserService.user.subscriptions) {
                                subscribedBoards[boardId] = eventBoards.val()[boardId];
                            }
                            resolve(subscribedBoards);
                        } else {
                            resolve(null);
                        }
                    })
                });
            },
            getEventBoard: function(boardId) {
                return $q(function(resolve, reject) {
                    ref.child(boardId).once("value", function(snapshot) {
                        resolve(snapshot.val());
                    });
                });
            },
            updateEventBoardCommentStatus: function(boardId) {
                return $q(function(resolve, reject) {
                    ref.child(boardId).transaction(function(board) {
                        if (board) {
                            board.commentCount = board.commentCount + 1;
                            board.lastCommentTime = Firebase.ServerValue.TIMESTAMP;
                        }
                        return board;
                    }, function(err, committed) {
                        if (!err && committed) {
                            resolve();
                        } else {
                            reject();
                        }
                    }, true);
                });
            },
            deleteBoard: function(boardId) {
                return $q(function(resolve, reject) {
                    ref.child(boardId).remove(function(err) {
                        if (err) {
                            reject();
                        } else {
                            resolve();
                        }
                    })
                });
            }
        };
    }
})();
