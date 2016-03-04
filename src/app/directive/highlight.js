(function() {
    'use strict';
    angular.module('sf_blog').directive('highlight', [
        function() {
            return {
                replace: false,
                scope: {
                    'ngModel': '='
                },
                link: function(scope, element, attributes) {
                    scope.$watch('ngModel', function(newVal, oldVal) {
                        if (newVal !== oldVal) {
                            element.html(scope.ngModel);
                            var items = element[0].querySelectorAll('pre code');
                            angular.forEach(items, function(item) {
                                hljs.highlightBlock(item);
                            });
                        }
                    });
                }
            };
        }
    ]);
})();