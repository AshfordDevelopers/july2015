(function() {
    "use strict";

    angular.module("crowdResponse")
        .service("AuthService", AuthService);

    AuthService.$inject = [
    	"$firebaseAuth"
    ];

    function AuthService(
		$firebaseAuth
    ){
        var ref = new Firebase("https://resplendent-heat-6845.firebaseio.com");

        var auth = $firebaseAuth(ref);

        this.requireAuth = function() {
        	return auth.$requireAuth();
        };
    }
})();
