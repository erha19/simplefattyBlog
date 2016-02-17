(function () {
	'use strict';

	angular.module('sf_blog.resources')
		.factory('Tags', function($resource,ServerUrl){
			var tagsResource = $resource(ServerUrl + '/tags/:id/:controller', {
					id: '@_id'
				},
				{
					//前台数据
					getFrontTagList:{
						method:'GET',
						params:{
							id:'getFrontTagList'
						}
					}
				});

			return {
			  //前台数据
			  getFrontTagList:function (callback) {
			    var cb = callback || angular.noop;
			    return tagsResource.getFrontTagList(function(result) {
			      return cb(result);
			    }, function(err) {
			      return cb(err);
			    }).$promise;
			  }
			};
		});
})();
