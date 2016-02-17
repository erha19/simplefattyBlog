(function() {
	'use strict';

	angular.module('sf_blog.service')
		.factory('AuthInterceptor', function($rootScope, $q, $location, $injector) {
			var Auth;
			return {
				// request: function(config) {
				// 	config.headers = config.headers || {};
				// 	if ($cookies.get('token')) {
				// 		config.headers.Authorization = 'Bearer ' + $cookies.get('token').replace(/(^\")|(\"$)/g, "");
				// 	}
				// 	return config;
				// },
				// response: function(response) {
				// 	return response;
				// },
				// responseError: function(rejection) {
				// 	return rejection;
				// }
			};
		});
})();