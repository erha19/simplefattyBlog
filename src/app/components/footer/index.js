(function() {
	'use strict';

	angular.module('sf_blog').component('sfFooter', {
			templateUrl: 'app/components/footer/footer.html',
			controller: 'footerCtrl',
			controllerAs: 'footer'
				// ,
				// bindings: {
				// }
		})
		.controller('footerCtrl', ['$rootScope', '$window', function() {
			this.info = 'Simplefatty © 2015-2016 ';

			$rootScope.$on('$stateChangeSuccess', function( /*event, toState, toParams, fromState, fromParams*/ ) {
				$window.scrollTo(0, 0);
			});

		}]);

})();