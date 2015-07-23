(function() {
    "use strict";

    angular.module("crowdResponse")
        .run(ionicPlatformSetup);

    ionicPlatformSetup.$inject = [
    	'$ionicPlatform',
    	"$rootScope",
    	"$location"
    ];

    function ionicPlatformSetup(
    	$ionicPlatform,
    	$rootScope,
    	$location
    ){
    	$ionicPlatform.ready(function() {
		    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		    // for form inputs)
		    if (window.cordova && window.cordova.plugins.Keyboard) {
		      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		    }
		    if (window.StatusBar) {
		      // org.apache.cordova.statusbar required
		      StatusBar.styleDefault();
		    }
	  	});

	  	$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
	  		$location.path("/home");
		});

		$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
  			console.log("State change error");
            console.log(error);
            $location.path("/home");
		});
    }
})();
