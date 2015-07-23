(function() {
    "use strict";

    angular.module("crowdResponse")
        .service("TimeService", TimeService);

    function TimeService(){
        var self = this;

        self.timeSince = function timeSince(dateValue) {
			var date;
			if (typeof(dateValue) !== "object") {
				var date = new Date(dateValue);
			} else {
				date = dateValue;
			}
		    var seconds = Math.floor((new Date() - date) / 1000);

		    var interval = Math.floor(seconds / 31536000);

		    if (interval > 1) {
		        return interval + " years";
		    }
		    interval = Math.floor(seconds / 2592000);
		    if (interval > 1) {
		        return interval + " months";
		    }
		    interval = Math.floor(seconds / 86400);
		    if (interval > 1) {
		        return interval + " days";
		    }
		    interval = Math.floor(seconds / 3600);
		    if (interval > 1) {
		        return interval + " hours";
		    }
		    interval = Math.floor(seconds / 60);
		    if (interval > 1) {
		        return interval + " minutes";
		    }
		    return Math.floor(seconds) + " seconds";
		};
    }
})();
