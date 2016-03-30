/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
  'use strict';

  angular
    .module('sf_blog')
    .config(routesConfig)
    .run(routesRun)

  routesConfig.$inject = ['$stateProvider', '$httpProvider', '$locationProvider','$logProvider', '$urlRouterProvider', 'RouteHelpersProvider','isDebug'];

  function routesConfig($stateProvider, $httpProvider, $locationProvider,$logProvider, $urlRouterProvider, helper,isDebug) {


    $locationProvider.html5Mode(true);
    // Enable log
    $logProvider.debugEnabled(isDebug);
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/');
  }

  routesRun.$inject = ['$rootScope', '$state'];

  function routesRun($rootScope, $state) {

    $rootScope.$on('$stateChangeSuccess', function(event, current) {
      if (current && (current.$$route || current).redirectTo) {
        return;
      }
      $rootScope.seo = {
        description: getMetaDescription(current),
        title: getPageTitle(current)
      }
    })

    function getMetaDescription(current) {
      var description = current.description;
      return description ? description : $rootScope.artical.description;
    }

    function getPageTitle(current) {
      var title = current.title;
      return title ? title : $rootScope.artical.title;
    }

  }


})();