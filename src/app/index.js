(function(){
	'use strict';

	angular.module('sf_blog',[
		//thridpart
		'ui.router',
		'ngTouch',
		'ngSanitize',
		'ngAnimate',
		'oc.lazyLoad',
		//customer
		'sf_blog.main',
		'sf_blog.resources',
		'sf_blog.directive'
	]);
})();