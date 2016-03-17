(function() {
    'use strict';
    angular.module('sf_blog.main')
        .filter('dataFilter',function(){
            return function(input,params){
                var date=new Date(input),
                    year=date.getFullYear(),
                    month=date.getMonth()+1,
                    day=date.getDate();
                    month=month>9?month:'0'+month;
                    day=day>9?day:'0'+day;
                return year+'.'+month+'.'+day
            }
        })
        .controller('MainController', ['$scope', '$timeout', 'Blog', 'Tags', 'EVENT', function($scope, $timeout, Blog, Tags, EVENT) {

            var tagListName = {},
                tagArray = [];

            var ispc=(function() {
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
            Tags.getFrontTagList().then(function(result) {
                $scope.tagList=result.data;
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
            $scope.changeTag=function(tagId){
                $scope.options.currentPage = 1;
                $scope.options.tagId = tagId;
                $scope.options.sortName = '';
                loadingArtical($scope.options,true);
            }
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
                        window.prerenderReady = true;
                    }, 100, true)
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
})(window);