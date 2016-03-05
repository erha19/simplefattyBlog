(function() {
    'use strict';
    angular.module('sf_blog.article')
        .controller('ArticleCtrl', ['$rootScope', '$scope', '$state', 'Blog', '$stateParams', '$location','$timeout', function($rootScope, $scope, $state, Blog, $stateParams, $location,$timeout) {
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
                // $timeout(function(){
                //     vm.article.content=vm.article.content.replace(/<pre ([^<>]*)>([^<>]*)<\/pre>/gi, '<hljs$1>$2</hljs>');
                //     console.log(vm.article.content)
                // },0,true)
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