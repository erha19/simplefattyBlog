(function() {
    'use strict';
    angular.module('sf_blog.main',[])
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'app/components/main/main.html',
                    controller: 'MainController',
                    controllerAs: 'main',
                    title:'Simplefatty|首页'
                });
        }])
})();