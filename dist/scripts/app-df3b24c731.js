(function(){
	'use strict';

	angular.module('sf_blog',[
		'ui.router',
		'ngTouch',
		'ngSanitize',
		'sf_blog.article',
		'sf_blog.resources',
		'sf_blog.service'
	])
	.config(function ($logProvider,$stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, IsDebug) {
	  $locationProvider.html5Mode(true);
	  $httpProvider.defaults.timeout = 500000;
	  $httpProvider.defaults.withCredentials = true;
	  $httpProvider.interceptors.push('AuthInterceptor');
	  // Enable log
	  $logProvider.debugEnabled(IsDebug);
	  $urlRouterProvider.otherwise('/');
	})
})();
(function() {
	'use strict';

	angular.module('sf_blog').component('sfNavbar', {
		templateUrl: 'app/components/navbar/navbar.html'
	});

})();
(function() {

	angular.module('sf_blog').directive('loadMore', ['$timeout', "$window","EVENT", function($timeout, $window,EVENT) {
		return {
			restrict: 'AE',
			link: function(scope, element, attrs) {
				angular.element($window).on('scroll', function() {
					var scrollTop = parseInt(document.body.scrollTop),
						documentHeight = parseInt(document.body.clientHeight);
						console.log(scrollTop,$window.screen.height)
					if (scrollTop >= documentHeight - $window.screen.height+50) {
						$timeout(function() {
							scope.$emit(EVENT.NeedToLoad)
						}, 200, true)
					}
				});
			}
		}
	}])
})();
(function() {
    'use strict';
    angular.module('sf_blog')
        .config(['$stateProvider',function($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'app/components/main/main.html',
                    controller: 'MainController',
                    controllerAs: 'main'
                });
        }])
        .controller('MainController', ['$scope', '$timeout', 'Blog', 'Tags', 'EVENT', function($scope, $timeout, Blog, Tags, EVENT) {

            var tagListName = {},
                tagArray = [];
            var browser = {
                versions: function() {
                    var u = navigator.userAgent;
                    return { 
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/)  
                    };
                }(),
            }
            $scope.isLoading = true;
            Tags.getFrontTagList().then(function(result) {
                for (var i in result.data) {
                    tagListName[result.data[i]._id] = result.data[i].name
                }
                loadingArtical($scope.options);
            });
            $scope.blogList = [];
            $scope.options = {
                currentPage: 1,
                itemsPerPage: 10,
                sortName: 'publish_time',
                tagId: ''
            };

            function loadingArtical(options, isReset) {
                $scope.isLoading = true;
                //数量需要过滤
                Blog.getFrontBlogCount(options).then(function(result) {
                    $scope.blogCount = result.count;
                    $scope.numPages = Math.ceil($scope.blogCount / $scope.options.itemsPerPage);
                });
                //获取列表
                Blog.getFrontBlogList(options).then(function(result) {
                    for (var j in result.data) {
                        tagArray = [];
                        for (var k in result.data[j].tags) {
                            tagArray.push(tagListName[result.data[j].tags[k]])
                        }
                        console.log(browser.versions.mobile)
                        if(browser.versions.mobile)
                            result.data[j].image=result.data[j].images[0]
                        else
                            result.data[j].image=result.data[j].images[1]
                        result.data[j]['tagName'] = tagArray.join(',');
                    }
                    $timeout(function() {
                        if (isReset) {
                            $scope.blogList = result.data;
                        } else {
                            $scope.blogList = $scope.blogList.concat(result.data);
                        }
                        $scope.isLoading = false;
                    }, 0, true)
                }).catch(function() {
                    $scope.isLoading = false;
                    $scope.blogList = [];
                });
            }
            $scope.$on(EVENT.NeedToLoad, function() {
                if ($scope.options.currentPage * $scope.options.itemsPerPage < $scope.blogCount) {
                    $scope.isLoading = true;
                    $scope.options.currentPage++;
                    loadingArtical($scope.options);
                }
            })
        }])
})();

(function() {
	'use strict';

	angular.module('sf_blog').component('sfLoading', {
		templateUrl: 'app/components/loading/loading.html'
	});

})();
(function() {
	'use strict';

	angular.module('sf_blog').component('sfFooter', {
		templateUrl: 'app/components/footer/footer.html'
	});

})();
(function() {
  'use strict';

  angular.module('sf_blog')
    .component('sfBanner', {
      templateUrl: 'app/components/banner/banner.html'
    })
    .directive('tagContent', ['$timeout',function($timeout) {
      return {
        template: '<span ng-bind="tagName"></span>',
        scope:true,
        replace:true,
        link: function(scope, elm, attrs, ctrl) {
        var tags = [
            "Front-End Developer",
            "Designer",
            "Programmer",
            "Gamer",
            "JavaScript Developer",
            "HTML Developer",
            "Web Programmer"
          ];
          scope.tagName=tags[0];

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
            return tags[Math.floor(Math.random() * tags.length)];

          }
        }
      }
    }])

})();
(function() {
    'use strict';
    angular.module('sf_blog.article', [])
        .config(['$stateProvider',function($stateProvider) {
            $stateProvider
                .state('article', {
                    url: '/article/:aid',
                    templateUrl: 'app/components/article/article.html',
                    controller: 'ArticleCtrl'
                });
        }])
})();
(function() {
'use strict';
angular.module('sf_blog.article')
    .controller('ArticleCtrl', ['$rootScope','$scope','$state','Blog','$stateParams', function($rootScope,$scope,$state,Blog,$stateParams) {
            $scope.aid = $stateParams.aid;
            if (!$scope.aid) {
                $state.go('home');
            }
            Blog.getFrontArticle({
                id: $scope.aid
            }).then(function(result) {
                $scope.article = result.data;
            }).then(function() {
                var options = {
                    id: $scope.aid,
                    sortName: 'publish_time',
                    tagId: ''
                };

                Blog.getPrenext(options).then(function(result) {
                    $scope.next = result.data.next || {};
                    $scope.prev = result.data.prev || {};
                });
            }).catch(function() {
                $state.go('home');
            });


    }])
})();
(function() {
	'use strict';

	angular.module('sf_blog.service',[])
})();
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
(function () {
	'use strict';

	angular.module('sf_blog.resources',[
		'ngResource'
	]);
})();

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

(function () {
  'use strict';

  angular.module('sf_blog.resources')
    .factory('Comment', function($resource,ServerUrl){
      var commentResource = $resource(ServerUrl + '/comment/:id/:controller', {
          id: '@_id'
        },
        {
          //前台数据
          getFrontCommentList:{
            method:'GET',
            params:{
              controller:'getFrontCommentList'
            }
          },
          addNewComment:{
            method:'POST',
            params:{
              id:'addNewComment'
            }
          },
          addNewReply:{
            method:'POST',
            params:{
              controller:'addNewReply'
            }
          },
          delReply:{
            method:'PUT',
            params:{
              controller:'delReply'
            }
          }
        });

      return {
        addNewComment: function(data,callback){
          var cb = callback || angular.noop;
          return commentResource.addNewComment(data,function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        },
        getFrontCommentList:function (data,callback) {
          var cb = callback || angular.noop;
          return commentResource.getFrontCommentList(data,function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        },
        addNewReply:function (id,data,callback) {
          var cb = callback || angular.noop;
          return commentResource.addNewReply({id:id},data,function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        },
        delComment:function (data,callback) {
          var cb = callback || angular.noop;
          return commentResource.remove(data,function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        },
        delReply:function (id,data,callback) {
          var cb = callback || angular.noop;
          return commentResource.delReply({id:id},data,function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        }
      };

    });
})();


(function () {
  'use strict';

  angular.module('sf_blog.resources')
    .factory('Blog', function($resource,ServerUrl){
      var blogResource = $resource(ServerUrl + '/article/:id/:controller', {
          id: '@_id'
        },
        {
          //前台数据
          getFrontBlogList:{
            method:'GET',
            params:{
              id:'getFrontArticleList'
            }
          },
          getFrontBlogCount:{
            method:'GET',
            params:{
              id:'getFrontArticleCount'
            }
          },
          getFrontArticle:{
            method:'GET',
            params:{
              controller:'getFrontArticle'
            }
          },
          getIndexImage:{
            method:'GET',
            params:{
              id:'getIndexImage'
            }
          },
          toggleLike:{
            method:'PUT',
            params:{
              controller:'toggleLike'
            }
          },
          getPrenext:{
            method:'GET',
            params:{
              controller:'getPrenext'
            }
          }
        });
      return {
        //前台数据
        getFrontBlogList:function (data,callback) {
          var cb = callback || angular.noop;
          return blogResource.getFrontBlogList(data,function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        },
        getFrontBlogCount:function (data,callback) {
          var cb = callback || angular.noop;
          return blogResource.getFrontBlogCount(data,function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        },
        getFrontArticle:function (data,callback) {
          var cb = callback || angular.noop;
          return blogResource.getFrontArticle(data,function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        },
        getIndexImage:function (callback) {
          var cb = callback || angular.noop;
          return blogResource.getIndexImage(function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        },
        toggleLike:function (data,callback) {
          var cb = callback || angular.noop;
          return blogResource.toggleLike(data,{},function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        },
        getPrenext:function (data,callback) {
          var cb = callback || angular.noop;
          return blogResource.getPrenext(data,function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        }
      };


    });
})();


(function () { 
 return angular.module('sf_blog')
.constant('ServerUrl', "http://simplefatty.cn")
.constant('IsDebug', false)
.constant('CookieConfig', {"domain":"sf_blog"})
.constant('EVENT', {"NeedToLoad":"need-to-load"});

})();

angular.module("sf_blog").run(["$templateCache", function($templateCache) {$templateCache.put("app/components/article/article.html","<div class=\"sf_artical_content clearfix\"><div class=\"markdown col-sm-offset-2 col-sm-8\" data-ng-bind-html=\"::article.content\"></div></div>");
$templateCache.put("app/components/banner/banner.html","<div class=\"sf_banner\"><h1><span class=\"logo-tag\">&lt;</span><tag-content></tag-content><span class=\"text-cursor\">|</span> <span class=\"logo-tag\">/&gt;</span></h1><h2>Simplefatty</h2></div>");
$templateCache.put("app/components/footer/footer.html","<div class=\"sf_footer\">Super-powered by Simplefatty ©2015-2016 粤ICP备16009462号</div>");
$templateCache.put("app/components/loading/loading.html","<div class=\"ball\"></div><div class=\"ball\"></div><div class=\"ball\"></div><div class=\"ball_block\"></div>");
$templateCache.put("app/components/main/main.html","<sf-banner></sf-banner><div class=\"container sf_container\"><div class=\"row\" data-ng-repeat=\"blog in blogList\"><div class=\"col-sm-offset-1 col-sm-10 sf_artical_item\"><img ng-src=\"{{::blog.image}}\" class=\"img-responsive\" alt=\"Responsive image\"><h1 ui-sref=\"article({aid:blog._id})\">{{::blog.title}} <span class=\"icon-read\">{{::blog.visit_count}}</span> <i class=\"icon-talk\">{{::blog.comment_count}}</i></h1><div class=\"artical_tag\"><div class=\"tag icon-tag\" data-ng-bind=\"::blog.tagName\"></div><div class=\"time icon-time\" data-ng-bind=\"::blog.publish_time\"></div></div><p data-ng-bind=\"::blog.introduce\"></p></div></div><sf-loading class=\"loading\" ng-show=\"isLoading\" load-more=\"\"></sf-loading></div>");
$templateCache.put("app/components/navbar/navbar.html","<div class=\"sf_navbar\"><div class=\"container clearfix\"><a href=\"\" class=\"sf_logo\"><img src=\"../assets/images/user_ic.png\" alt=\"\"></a><ul class=\"sf_nav pull-right\"><li ui-sref-active=\"active\"><a ui-sref=\"home\">首页</a></li><li>实验室</li></ul></div></div>");}]);