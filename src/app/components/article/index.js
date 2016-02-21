(function() {
    'use strict';
    angular.module('sf_blog.article', [])
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('article', {
                    url: '/article/:aid',
                    templateUrl: 'app/components/article/article.html',
                    controller: 'ArticleCtrl',
                    title: ['$stateParams', 'Blog', function($stateParams, Blog) {
                        Blog.getFrontArticle({
                            id: $stateParams.aid
                        }).then(function(data){
                            return data.data.title;
                        })
                    }]
                });
        }])
})();