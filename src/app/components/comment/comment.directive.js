(function() {
	'use strict';

	angular.module('sf_blog.article')

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
					// dynamic load the duoshuo comment box
				var el = document.createElement('div'); //该div不需要设置class="ds-thread"
				el.setAttribute('data-thread-key', data_thread_key); //必选参数
				el.setAttribute('data-url', data_url); //必选参数
				el.setAttribute('data-title', data_title); //必选参数
				el.setAttribute('data-author-key', data_author_key); //可选参数
				// DUOSHUO.EmbedThread(el);
				element.append(el);

			}
		};
	});
})()