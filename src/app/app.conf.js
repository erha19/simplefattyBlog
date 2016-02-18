(function () { 
 return angular.module('sf_blog')
.constant('ServerUrl', "http://api.simplefatty.cn")
.constant('IsDebug', false)
.constant('CookieConfig', {"domain":"sf_blog"})
.constant('EVENT', {"NeedToLoad":"need-to-load"});

})();
