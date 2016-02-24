(function() {
    'use strict';
    angular.module('sf_blog.article')
        .controller('ArticleCtrl', ['$rootScope', '$scope', '$state', 'Blog', '$stateParams', '$location','stateTitle', function($rootScope, $scope, $state, Blog, $stateParams, $location,stateTitle) {
            var vm=this;
            vm.aid = $stateParams.aid;
            vm.url = $location.$$absUrl;
            if (!vm.aid) {
                $state.go('home');
            }
            Blog.getFrontArticle({
                id: vm.aid
            }).then(function(result) {
                vm.article = result.data;
                vm.title = result.data.title;
            }).then(function() {
                var options = {
                    id: vm.aid,
                    sortName: 'publish_time',
                    tagId: ''
                };

                Blog.getPrenext(options).then(function(result) {
                    vm.next = result.data.next || {};
                    vm.prev = result.data.prev || {};
                });
            }).catch(function() {
                $state.go('home');
            });


        }])
})();