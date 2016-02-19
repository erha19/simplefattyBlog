(function(){
	'use strict';

	angular.module('sf_blog',[
		'ui.router',
		'ngTouch',
		'ngSanitize',
		'sf_blog.article',
		'sf_blog.resources',
		'sf_blog.service'
	])
	.config(['$logProvider','$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'IsDebug',function ($logProvider,$stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, IsDebug) {
	  $locationProvider.html5Mode(true);
	  $httpProvider.defaults.timeout = 500000;
	  $httpProvider.defaults.withCredentials = true;
	  $httpProvider.interceptors.push('AuthInterceptor');
	  // Enable log
	  $logProvider.debugEnabled(IsDebug);
	  $urlRouterProvider.otherwise('/');
	}])
})();