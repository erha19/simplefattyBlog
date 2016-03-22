(function() {
    'use strict';
        
        angular.module('sf_blog.article')
        

        .controller('ArticleCtrl', ArticleCtrl)

        ArticleCtrl.$inject=['$rootScope', '$scope', '$state', 'Blog','actical', '$stateParams', '$location','$timeout','$window']

        function ArticleCtrl($rootScope, $scope, $state, Blog, actical,$stateParams, $location,$timeout,$window) {
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
                $window.prerenderReady = true;
            })
        }
})();