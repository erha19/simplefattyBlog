(function(){
	'use strict';

	angular.module('sf_blog',[
		'ui.router',
		'ngTouch',
		'ngSanitize',
		'sf_blog.main',
		'sf_blog.article',
		'sf_blog.resources',
		'sf_blog.directive'
	])
	.config(Appconfig)
	.run(Apprun)

	Appconfig.$inject=['$logProvider','$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'IsDebug']

	function Appconfig($logProvider,$stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, IsDebug) {
	  
	  $locationProvider.html5Mode(true);
	  // Enable log
	  $logProvider.debugEnabled(IsDebug);
	  $locationProvider.hashPrefix('!');
	  $urlRouterProvider.otherwise('/');
	}

	Apprun.$inject=['$window','$document','$rootScope','$location','$injector','$timeout'];

	function Apprun($window,$document,$rootScope,$location,$injector,$timeout){

		$rootScope.$on('$stateChangeSuccess',function(event,current){
			if(current&&(current.$$route||current).redirectTo){
				return ;
			}
			$rootScope.seo={
				description:getMetaDescription(current),
				title:getPageTitle(current)
			}
		})

		function getMetaDescription(current){
			var description=current.description;
			return description?description:$rootScope.actical.description;
		}

		function getPageTitle(current){
			var title=current.title;
			return title?title:$rootScope.actical.title;
		}

	}	

})();