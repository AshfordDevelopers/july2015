(function() {
    "use strict";

    angular.module("crowdResponse")
        .service("UserService", UserService);

    UserService.$inject = [
        "$q",
        "$firebaseArray"
    ];

    function UserService(
        $q,
        $firebaseArray
    ) {
        var that = this;

        var ref = new Firebase(crowdResponseHosts.firebase + "/userProfiles");

        that.user = null;

        that.getUserProfile = function(userAccount) {
            return $q(function(resolve, reject) {
                if (userAccount) {
                    ref.child(userAccount.uid)
                        .once("value", function(snapshot) {
                            that.user = snapshot.val();
                            if (!that.user.hasOwnProperty("subscriptions")) {
                                that.user.subscriptions = {};
                            }
                            resolve(that.user);
                        }, reject);
                } else {
                    reject();
                }
            });
        };

        that.createProfile = function(user) {
            return $q(function(resolve, reject) {
                user.subscriptions = {};

                var onComplete = function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve()
                    }
                };

                ref.child(user.uid).set(user, onComplete);
            });
        }

        that.findUserProfile = function(userId) {
            return $q(function(resolve, reject) {
                ref.child(userId)
                    .once("value", function(snapshot) {
                        resolve(snapshot.val());
                    }, reject);
            });
        };

        that.subscribeToBoard = function(boardId) {
            return $q(function(resolve, reject) {
                ref.child(that.user.uid).child("subscriptions").child(boardId).set(new Date().getTime(), function() {
                    ref.child(that.user.uid)
                        .once("value", function(snapshot) {
                            that.user = snapshot.val();
                            resolve(snapshot.val());
                        }, reject);
                });
            });
        };

        that.unsubscribeFromBoard = function(boardId) {
            delete that.user.subscriptions[boardId];
            return $q(function(resolve, reject) {
                ref.child(that.user.uid).child("subscriptions").child(boardId).remove(function() {
                    ref.child(that.user.uid)
                        .once("value", function(snapshot) {
                            that.user = snapshot.val();
                            resolve(snapshot.val());
                        }, reject);
                });
            });
        };
    }
})();
