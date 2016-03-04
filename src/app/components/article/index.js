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
                        stateTitle:['$stateParams','$rootScope','Blog',function($stateParams,$rootScope,Blog){
                            return Blog.getFrontArticle({
                                id: $stateParams.aid
                            }).then(function (response) {
                                $rootScope.title=response.data.title;
                                return response.data.title;
                            });
                    }]}
                });

        }])
})();