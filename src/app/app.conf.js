(function () { 
 return angular.module('sf_blog')
.constant('ServerUrl', "http://api.jackhu.top")
.constant('IsDebug', false)
.constant('CookieConfig', {"domain":".jackhu.top"})
.constant('EVENT', {"NeedToLoad":"need-to-load"});

})();
