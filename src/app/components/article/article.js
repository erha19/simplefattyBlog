(function() {
    'use strict';
    angular.module('sf_blog.article', [])
        .config(function($stateProvider) {
            $stateProvider
                .state('article', {
                    url: '/article/:aid',
                    templateUrl: 'app/components/article/article.html',
                    controller: 'ArticleCtrl'
                });
        })
})()