(function () { 
 return angular.module('sf_blog')
.constant('ServerUrl', "http://localhost:9000")
.constant('IsDebug', true)
.constant('CookieConfig', {"domain":""})
.constant('EVENT', {"NeedToLoad":"need-to-load"});

})();
