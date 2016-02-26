(function(){
	'use strict';

	angular.module('sf_blog',[
		'ui.router',
		'ngTouch',
		'ngSanitize',
		'sf_blog.main',
		'sf_blog.article',
		'sf_blog.resources',
		'sf_blog.directive',
		'sf_blog.service'
	])
	.config(Appconfig)
	.run(Apprun)

	Appconfig.$inject=['$logProvider','$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'IsDebug']

	function Appconfig($logProvider,$stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, IsDebug) {
	  $locationProvider.html5Mode(true);
	  $httpProvider.defaults.timeout = 500000;
	  $httpProvider.defaults.withCredentials = true;
	  $httpProvider.interceptors.push('AuthInterceptor');
	  // Enable log
	  $logProvider.debugEnabled(IsDebug);
	  $urlRouterProvider.otherwise('/');
	}

	Apprun.$inject=['$window','$document','$rootScope','$location','$injector','$timeout'];

	function Apprun($window,$document,$rootScope,$location,$injector,$timeout){

		$rootScope.$on('$stateChangeSuccess',function(event,current){
			if(current&&(current.$$route||current).redirectTo){
				return ;
			}

			var title=getPageTitle(current);
			$timeout(function(){
				$window.title=title;
				$document[0].title=title;
			},0,true)
		})

		function getPageTitle(current){
			var title=current.title;
			return angular.isUndefined(title)?$rootScope.title:title;
		}

	}	

})();