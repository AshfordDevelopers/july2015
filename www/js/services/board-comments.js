(function() {
    "use strict";

    angular.module("crowdResponse")
        .factory("BoardCommentsService", BoardCommentsService);

    BoardCommentsService.$inject = [
        "$q",
        "EventBoardsService",
        "$ionicLoading",
        "UserService"
    ];

    function BoardCommentsService(
        $q,
        EventBoardsService,
        $ionicLoading,
        UserService
    ) {
        var ref = new Firebase(crowdResponseHosts.firebase).child("boardComments");

        var newComments = new Firebase(crowdResponseHosts.firebase)
            .child("boardComments")
            .orderByChild("createdDate")
            .startAt(Date.now())
            .on("child_added", function(comment) {
                var newComment = comment.val();
                if (newComment.createdBy !== UserService.user.uid) {
                    $ionicLoading.show({
                        template: "New comment: " + newComment.value,
                        noBackdrop: true,
                        duration: 2000
                    });
                }
            });

        return {
            getBoardComments: function(boardId) {
                return $q(function(resolve, reject) {
                    ref.orderByChild("boardId")
                        .startAt(boardId)
                        .endAt(boardId)
                        .once("value", function(snapshot) {
                            var comments = [];
                            snapshot.forEach(function(childSnapshot) {
                                var comment = childSnapshot.val();
                                comment.$id = childSnapshot.key();
                                comments.push(comment);
                            });

                            resolve(comments);
                        });
                });
            },
            likeComment: function(commentId, userId) {
                return $q(function(resolve, reject) {
                    ref.child(commentId).child("likes").child(userId).set(Firebase.ServerValue.TIMESTAMP, function() {
                        // resolve with the original comment value so it can be updated in the calling service
                        ref.child(commentId)
                            .once("value", function(snapshot) {
                                resolve(snapshot.val());
                            }, reject);
                    });
                })
            },
            addNewComment: function(comment, currentCommentLength) {
                return $q(function(resolve, reject) {
                    var newComment = ref.push();
                    newComment.set(comment, function(err) {
                        if (err) {
                            reject();
                        } else {
                            EventBoardsService.updateEventBoardCommentStatus(comment.boardId)
                                .then(resolve(newComment.key()));
                        }
                    });
                });
            },
            deleteAllBoardComments: function(boardId) {
                return $q(function(resolve, reject) {
                    ref.transaction(function(comments) {
                        if (comments) {
                            for (var id in comments) {
                                if (comments[id].boardId === boardId) {
                                    delete comments[id];
                                }
                            }
                        }
                        return comments;
                    },
                        function(err) {
                            if (err) {
                                reject();
                            } else {
                                resolve();
                            }
                        });
                });
            },
            deleteComment: function(commentId) {
                return $q(function(resolve, reject) {
                    ref.child(commentId).remove(resolve);
                });
            }
        };
    }
})();
