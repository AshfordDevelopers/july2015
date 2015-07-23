(function() {
    "use strict";

    angular.module("crowdResponse")
        .factory("LoginService", LoginService);

    LoginService.$inject = [
        "$q",
        "Auth"
    ];

    var users = {
        '1': {
            $id: '1',
            emailAddress: "test",
            password: "test"
        }
    };

    function LoginService(
        $q,
        Auth
    ) {
        return {
            logIn: function(user) {
                return $q(function(resolve, reject) {
                    Auth.$authWithPassword({
                        email: user.email,
                        password: user.password
                    })
                        .then(function(authData) {
                            console.log("Logged in as:", authData.uid);
                            resolve(authData);
                        })
                        .catch(function(error) {
                            console.error("Authentication failed:", error);
                            reject(error);
                        });
                });
            },
            signUpUser: function(newUser) {
                // register new user with ionic
                return $q(function(resolve, reject) {
                    Auth.$createUser({
                        email: newUser.email,
                        password: newUser.password
                    })
                        .then(function(userData) {
                            userData.email = newUser.email;
                            userData.fullName = newUser.fullName;
                            resolve(userData);
                        })
                        .catch(function(error) {
                            reject(error);
                        });
                });
            }
        };
    }

})();
