(function() {
    'use strict';
    angular.module('sf_blog')

        .config(['$stateProvider','RouteHelpersProvider', function($stateProvider,helper) {

            $stateProvider
                .state('article', {
                    url: '/article/:aid',
                    template: '<article-content></article-content>',
                    resolve: {
                        article: ['$stateParams', '$rootScope', 'Api', function($stateParams, $rootScope, Api) {
                            return Api.Article.getFrontArticle({
                                id: $stateParams.aid
                            }).$promise.then(function(response) {
                                $rootScope.artical = {
                                    title: response.data.title,
                                    description: response.data.introduce
                                }
                                return response.data;
                            });
                        }]
                    },
                    controller: ArticleMidewaerCtrl
                });

        }])

    ArticleMidewaerCtrl.$inject = ['$rootScope', '$scope', 'article']

    function ArticleMidewaerCtrl($rootScope, $scope, article) {
        

        $scope.article = article;
    }


})();