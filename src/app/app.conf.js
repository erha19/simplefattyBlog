(function () { 
 return angular.module('sf_blog')
.constant('ServerUrl', "/api")
.constant('IsDebug', false)
.constant('CookieConfig', {"domain":"sf_blog"})
.constant('EVENT', {"NeedToLoad":"need-to-load"});

})();
