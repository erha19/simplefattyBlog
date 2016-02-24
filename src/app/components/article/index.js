(function() {
    'use strict';
    angular.module('sf_blog.article', [])
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('article', {
                    url: '/article/:aid',
                    templateUrl: 'app/components/article/article.html',
                    controller: 'ArticleCtrl',
                    controllerAs:'artical',
                    resolve:{
                        stateTitle:['$stateParams','Blog',function($stateParams,Blog){
                            return Blog.getFrontArticle({
                                id: $stateParams.aid
                            }).then(function (response) {
                                return response.data.title;
                            });
                    }]}
                });

        }])
})();