(function() {
    'use strict';
    angular.module('sf_blog')


    .directive('duoshuoLoad',duoshuoLoad);

    function duoshuoLoad(){
        return {
                replace: false,
                scope: true,
                template:"<comment class='comment' ng-if='showComment' article='artical.common.aid' title='artical.title' url='artical.common.url'></comment>",
                controller:CommentCtroller
        }
    }


    CommentCtroller.$inject=['$window','$scope'];

    function CommentCtroller($window,$scope){

        var head = document.getElementsByTagName('head')[0],

            script = document.createElement('script'),

            loadedScript=head.getElementsByTagName('script'),

            flag=false;

            $scope.showComment=false;

        for(var i in loadedScript){
            if(loadedScript[i].src=='http://static.duoshuo.com/embed.js'){
                flag=true;
                break;
            }

        }

        if(!flag){
            window.duoshuoQuery = {short_name:"sfatty"};

            
            
            script.type= 'text/javascript'; 
            
            script.src= 'http://static.duoshuo.com/embed.js'; 

            script.onload = script.onreadystatechange = function() { 
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) { 
                show(); 
                script.onload = script.onreadystatechange = null; 
            } }; 
            
            head.appendChild(script); 
        }
        else{
                show();
        }

        function show(){
            $scope.showComment=true;
        }
    }
})();