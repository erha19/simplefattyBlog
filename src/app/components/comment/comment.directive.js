(function() {
	'use strict';

	angular.module('sf_blog')

	.directive("comment", function() {
		return {
			restrict: 'AE',
			template: '<div class="ds-thread" ng-transclude></div>',
			transclude:true,
			scope: {
				article: '=article',
				title: '=',
				url: '='
			},
			link: function(scope, element) {
				// get the variable from controller
				var data_thread_key = scope.article,
					data_url = scope.url,
					data_author_key = scope.url,
					data_title = scope.title;
				var el = document.createElement('div'); 
				el.setAttribute('data-thread-key', data_thread_key);
				el.setAttribute('data-url', data_url); 
				el.setAttribute('data-title', data_title);
				el.setAttribute('data-author-key', data_author_key); 
				DUOSHUO.EmbedThread(el);
				element.append(el);

			}
		};
	});
})();