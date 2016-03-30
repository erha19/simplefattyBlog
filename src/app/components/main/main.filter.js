(function() {
    'use strict';
    angular.module('sf_blog.main')
        
    .filter('dataFilter', DataFilter)


    function DataFilter() {
        return function(input, params) {
            var date = new Date(input),
                year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate();
            month = month > 9 ? month : '0' + month;
            day = day > 9 ? day : '0' + day;
            return year + '.' + month + '.' + day
        }
    }


})();