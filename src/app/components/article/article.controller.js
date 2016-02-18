(function() {
'use strict';
angular.module('sf_blog.article')
    .controller('ArticleCtrl', ['$rootScope','$scope','$state','Blog','$stateParams', function($rootScope,$scope,$state,Blog,$stateParams) {
            $scope.aid = $stateParams.aid;
            if (!$scope.aid) {
                $state.go('home');
            }
            Blog.getFrontArticle({
                id: $scope.aid
            }).then(function(result) {
                $scope.article = result.data;
            }).then(function() {
                var options = {
                    id: $scope.aid,
                    sortName: 'publish_time',
                    tagId: ''
                };

                Blog.getPrenext(options).then(function(result) {
                    $scope.next = result.data.next || {};
                    $scope.prev = result.data.prev || {};
                });
            }).catch(function() {
                $state.go('home');
            });


    }])
})()