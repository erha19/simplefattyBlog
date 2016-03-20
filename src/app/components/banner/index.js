(function() {
  'use strict';

  angular.module('sf_blog')
    .component('sfBanner', {
      templateUrl: 'app/components/banner/banner.html',
      controller:'bannerCtrl',
      controllerAs:'banner'
    })
    .controller('bannerCtrl', ['$scope', function(){
        this.tags=["Front-End Developer",
            "Designer",
            "Programmer",
            "Web Programmer"]
    }])
    .directive('tagContent', ['$timeout',function($timeout) {
      return {
        template: '<span ng-bind="tagName"></span>',
        scope:{
          tags:'='
        },
        replace:true,
        link: function(scope, elm, attrs, ctrl) {
          
          scope.tagName=scope.tags[0];

          $timeout(backspaceTagContent, 1000,true);

          function changeTagContent() {
            backspaceTagContent();
          }

          function backspaceTagContent() {
            scope.tagName=scope.tagName.slice(0, -1);
            if (scope.tagName.length) {
              $timeout(backspaceTagContent, 50,true);
            } else {
              $timeout(function() {
                insertTagContent(getRandomTag());
              }, 100,true);
            }
          }

          function insertTagContent(tag) {
            scope.tagName=tag.substring(0, scope.tagName.length + 1);
            if (scope.tagName.length != tag.length) {
              $timeout(function() {
                insertTagContent(tag);
              }, 100,true);
            } else {
              $timeout(changeTagContent, 5000,true);
            }
          }

          function getRandomTag() {
            return scope.tags[Math.floor(Math.random() * scope.tags.length)];

          }
        }
      }
    }])

})();