(function() {
    "use strict";

    angular.module("crowdResponse")
        .service("UserService", UserService);

    UserService.$inject = [
        "$q"
    ];

    function UserService(
        $q
    ) {
        var that = this;

        var userProfiles = {
            '1': {
                $id: '1',
                emailAddress: "test",
                password: "test",
                fullName: "Luke Jones",
                subscriptions: {}
            }
        };

        that.user = null;

        that.getUserProfile = function(auth) {
            that.user = userProfiles[auth.uid];
            return $q(function(resolve, reject) {
                if (that.user) {
                    resolve(that.user);
                } else {
                    reject();
                }
            });
        };

        that.createProfile = function(user) {
            return $q(function(resolve, reject) {
                var index = Object.keys(userProfiles).length + 1;
                userProfiles[index] = user;
                userProfiles[index].subscriptions = {};
                resolve();
            });
        };

        that.findUserProfile = function(userId) {
            return $q(function(resolve, reject) {
                resolve(userProfiles[userId]);
            });
        };

        that.subscribeToBoard = function(boardId) {
            that.user.subscriptions[boardId] = new Date();
        };

        that.unsubscribeFromBoard = function(boardId) {
            delete that.user.subscriptions[boardId];
        };
    }
})();
