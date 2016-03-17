(function(window) {
    'use strict';
    angular.module('sf_blog.article')
        .controller('ArticleCtrl', ['$rootScope', '$scope', '$state', 'Blog','actical', '$stateParams', '$location','$timeout', function($rootScope, $scope, $state, Blog, actical,$stateParams, $location,$timeout) {
            var vm=this;
            vm.common={
                aid:$stateParams.aid,
                url:$location.$$absUrl,
            }
            if (!vm.common.aid) {
                $state.go('home');
            }
            Blog.getFrontArticle({
                id: vm.common.aid
            }).then(function(result) {
                vm.article = actical;
                window.prerenderReady = true;
            }).then(function() {
                var options = {
                    id: vm.common.aid,
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
})(window);