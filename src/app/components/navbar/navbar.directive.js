(function() {

	angular.module('sf_blog').directive('scrollHidden', ['$timeout', "$window", "$document", function($timeout, $window, $document) {
		return {
			restrict: 'AE',
			link: function(scope, element, attrs) {
				var beforeScrollTop = document.body.scrollTop,
					afterScrollTop, delta, timer = null;
				scope.state = true;
				angular.element($window).on('scroll', function() {
					if (timer) {
						$timeout.cancel(timer)
					}
					afterScrollTop = document.body.scrollTop;
					if (afterScrollTop >100) {
						delta = afterScrollTop - beforeScrollTop;
						if (delta < 0) {
							console.log('up')
							timer = $timeout(function() {
								scope.state = true;
							}, 200, true)
						} else if (delta > 0) {
							console.log('down')

							timer = $timeout(function() {
								scope.state = false;
							}, 200, true)
						}
					}
					else{
						timer = $timeout(function() {
								scope.state = true;
							}, 200, true)
					}
					beforeScrollTop = angular.copy(afterScrollTop)
				});
			}
		}
	}])
})();