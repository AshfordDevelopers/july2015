(function() {
    "use strict";

    angular.module("crowdResponse")
        .factory("LoginService", LoginService);

    LoginService.$inject = [
    	'$q'
    ];

    var users = {
    	'1': {
    		$id: '1',
    		emailAddress: "test",
    		password: "test"
    	}
    };

    function LoginService(
    	$q
    ){
    	var validateUser = function(user) {
    		// temporary implementation
    		for (var account in users) {
    			if (users[account].emailAddress === user.emailAddress &&
    				users[account].password === user.password) {
    				return users[account];
    			}
    		}
    		return null;
    	};

        return {
        	logIn: function(user) {
 			  	return $q(function(resolve, reject) {
 			  		var account = validateUser(user);
 			  		if (account) {
 			  			resolve(account);
 			  		}
 			  		else {
 			  			reject();
 			  		}
 			  	});
        	},
            signUpUser: function(newUser) {
                // register new user with ionic
                return $q(function(resolve, reject) {
                    var index = Object.keys(users).length + 1;
                    users[index] = {
                        $id: index,
                        emailAddress: newUser.emailAddress,
                        password: newUser.password
                    };
                    users[index].fullName = newUser.fullName;
                    resolve(users[index]);
                });
            }
        };
    }

})();
