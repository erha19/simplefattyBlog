(function() {

	angular.module('sf_blog').directive('loadMore', ['$timeout', "$window","EVENT", function($timeout, $window,EVENT) {
		return {
			restrict: 'AE',
			link: function(scope, element, attrs) {
				angular.element($window).on('scroll', function() {
					var scrollTop = parseInt(document.body.scrollTop),
						documentHeight = parseInt(document.body.clientHeight);
						console.log(scrollTop,$window.screen.height)
					if (scrollTop >= documentHeight - $window.screen.height+50) {
						$timeout(function() {
							scope.$emit(EVENT.NeedToLoad)
						}, 200, true)
					}
				});
			}
		}
	}])
})()