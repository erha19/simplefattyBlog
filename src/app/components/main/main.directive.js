(function() {

	angular.module('sf_blog.main')

	.directive('loadMore', ['$timeout', "$window", "EVENT", function($timeout, $window, EVENT) {
		return {
			restrict: 'AE',
			link: function(scope, element, attrs) {
				angular.element($window).on('scroll', function() {
					var scrollTop = parseInt(document.body.scrollTop),
						documentHeight = parseInt(document.body.clientHeight);
					if (scrollTop >= documentHeight - $window.screen.height + 50) {
						$timeout(function() {
							scope.$emit(EVENT.NeedToLoad)
						}, 200, true)
					}
				});
			}
		}



	}])


	.directive('homepage', ['$timeout', "$window","$document", function($timeout, $window, $document) {
        return {
            restrict: 'AE',
            templateUrl: 'app/components/main/main.html',
            replace: true,
            controller: MainController,
            controllerAs: 'main'
        }
    }])

	MainController.$inject = ['$scope', '$timeout', 'Api', 'EVENT', '$window']

	function MainController($scope, $timeout, Api, EVENT, $window) {
		var tagListName = {},
			tagArray = [],
			timer = null;

		var ispc = (function() {
			var userAgentInfo = navigator.userAgent;
			var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
			var flag = true;
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) {
					flag = false;
					break;
				}
			}
			return flag;
		})();
		$scope.isLoading = true;
		Api.Tag.getFrontTagList().$promise.then(function(result) {
			console.log(result)
			$scope.tagList = result.data;
			for (var i in result.data) {
				tagListName[result.data[i]._id] = result.data[i].name
			}
			loadingArtical($scope.options);
		});
		$scope.blogList = [];
		$scope.options = {
			currentPage: 1,
			itemsPerPage: 3,
			sortName: 'publish_time',
			tagId: ''
		};
		$scope.changeTag = function(tagId) {
			$scope.options.currentPage = 1;
			$scope.options.tagId = tagId;
			$scope.options.sortName = '';
			loadingArtical($scope.options, true);
		}

		function loadingArtical(options, isReset) {
			$scope.isLoading = true;
			//数量需要过滤
			Api.Article.getFrontBlogCount(options).$promise.then(function(result) {

				$scope.blogCount = result.count;
				$scope.numPages = Math.ceil($scope.blogCount / $scope.options.itemsPerPage);
			});
			//获取列表
			Api.Article.getFrontBlogList(options).$promise.then(function(result) {
				for (var j in result.data) {
					tagArray = [];
					for (var k in result.data[j].tags) {
						tagArray.push(tagListName[result.data[j].tags[k]])
					}
					if (ispc)
						result.data[j].image = result.data[j].images[0]
					else
						result.data[j].image = result.data[j].images[1]
					result.data[j]['tagName'] = tagArray.join(',');
				}
				$timeout(function() {
					if (isReset) {
						$scope.blogList = result.data;
					} else {
						$scope.blogList = $scope.blogList.concat(result.data);
					}
					$scope.isLoading = false;
					$timeout(function(){$window.prerenderReady = true;},500)
				}, 100, true)
			}).catch(function() {
				$scope.isLoading = false;
				$scope.blogList = [];
			});
		}
		$scope.$on(EVENT.NeedToLoad, function() {
			if (timer)
				$timeout.cancel(timer)
			timer = $timeout(function() {
				if ($scope.options.currentPage * $scope.options.itemsPerPage < $scope.blogCount) {
					$scope.isLoading = true;
					$scope.options.currentPage++;
					loadingArtical($scope.options);
				}
			}, 100, true)
		})
	}
})();