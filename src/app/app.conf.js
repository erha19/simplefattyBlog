(function () { 
 return angular.module('sf_blog')
.constant('serverUrl', "/api")
.constant('isDebug', false)
.constant('EVENT', {"NeedToLoad":"need-to-load"});

})();
