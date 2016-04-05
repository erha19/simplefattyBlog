(function() {
    'use strict';
        
        angular.module('sf_blog')
        
        .directive('articleContent', ['$timeout', "$window","$document", function($timeout, $window, $document) {
            return {
                restrict: 'AE',
                templateUrl: 'app/components/article/article.html',
                replace: true,
                controller: ArticleCtrl,
                controllerAs: 'articleCtrl'         
            }
        }])

        ArticleCtrl.$inject=['$rootScope', '$scope', '$state', '$stateParams', '$location','$timeout','$window']

        function ArticleCtrl($rootScope, $scope, $state,$stateParams, $location,$timeout,$window) {
            var vm=this;
            vm.common={
                aid:$stateParams.aid,
                url:$location.$$absUrl,
            }
            if (!vm.common.aid) {
                $state.go('home');
            }
            $timeout(function(){vm.article = $scope.article;},0,true)

            //prerender
            $timeout(function(){$window.prerenderReady = true;},2000,true)
        }

})();