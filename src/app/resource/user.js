(function() {
	'use strict';

	angular.module('sf_blog.resources')
		.factory('User', function($resource, ServerUrl) {
			var userResource = $resource(ServerUrl + '/users/:id/:controller', {
				id: '@_id'
			}, {
				getCaptcha: {
					method: 'GET',
					params: {
						id: 'getCaptcha'
					}
				},
				get: {
					method: 'GET',
					params: {
						id: 'me'
					}
				},
				mdUser: {
					method: 'PUT',
					params: {
						id: 'mdUser'
					}
				},
				getUserProvider: {
					method: 'GET',
					params: {
						id: 'getUserProvider'
					}
				},
				snsLogins: {
					method: 'GET',
					params: {
						id: 'snsLogins'
					}
				}
			});

			return {
				get: userResource.get,
				getCaptcha: function(callback) {
					var cb = callback || angular.noop;
					return userResource.getCaptcha(function(result) {
						return cb(result);
					}, function(err) {
						return cb(err);
					}).$promise;
				},
				mdUser: function(data, callback) {
					var cb = callback || angular.noop;
					return userResource.mdUser(data, function(result) {
						return cb(result);
					}, function(err) {
						return cb(err);
					}).$promise;
				},
				getUserProvider: function(callback) {
					var cb = callback || angular.noop;
					return userResource.getUserProvider(function(result) {
						return cb(result);
					}, function(err) {
						return cb(err);
					}).$promise;
				},
				getLogins: function(callback) {
					var cb = callback || angular.noop;
					return userResource.snsLogins(function(result) {
						return cb(result);
					}, function(err) {
						return cb(err);
					}).$promise;
				}
			};
		});
})();