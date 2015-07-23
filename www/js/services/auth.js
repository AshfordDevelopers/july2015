(function() {
    "use strict";

    angular.module("crowdResponse")
        .factory("Auth", Auth);

    Auth.$inject = [
    	"$firebaseAuth"
    ];

    function Auth(
		$firebaseAuth
    ){
        var ref = new Firebase(crowdResponseHosts.firebase);

        return $firebaseAuth(ref);
    }
})();
