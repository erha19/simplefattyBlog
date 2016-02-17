(function(){
    'use strict';
     angular.module('sf_blog')
     .config(function ($stateProvider) {
        $stateProvider
          .state('home', {
            url: '/',
            templateUrl: 'app/components/main/main.html',
            controller: 'MainController',
            controllerAs: 'main'
          });
     })
     .controller('MainController',['$scope','Blog','Tags',function ($scope,Blog,Tags) {

        var tagListName={},tagArray=[];
        $scope.isLoading = true;
        Tags.getFrontTagList().then(function (result) {
            for(var i in result.data){
                tagListName[result.data[i]._id]=result.data[i].name
            }
            loadingArtical($scope.options);
        });
        $scope.blogList = [];
        $scope.options = {
            currentPage:1,              
            itemsPerPage:10,            
            sortName:'publish_time',    
            tagId: ''
        };
        function loadingArtical(options,isReset) {
             $scope.isLoading = true;
             //数量需要过滤
             Blog.getFrontBlogCount(options).then(function(result){
                $scope.blogCount = result.count;
                $scope.numPages = Math.ceil($scope.blogCount/$scope.options.itemsPerPage);
             });
            //获取列表
            Blog.getFrontBlogList(options).then(function(result){
                $scope.isLoading = false;
                for(var j in result.data){
                    tagArray=[];
                    for(var k in result.data[j].tags){
                        tagArray.push(tagListName[result.data[j].tags[k]])
                    }
                    result.data[j]['tagName']=tagArray.join(',');
                }
                if(isReset){
                    $scope.blogList = result.data;
                }else{
                    $scope.blogList = $scope.blogList.concat(result.data);
                }
            }).catch(function(){
               $scope.isLoading = false;
               $scope.blogList = [];
            });
        }
        
     }])
})()