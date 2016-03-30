(function() {
    'use strict';
    angular.module('sf_blog.main',[])
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    template: '<homepage></homepage>',
                    title:'Simplefatty | 首页',
                    description:'Simplefatty的个人博客'
                });
        }])
})();