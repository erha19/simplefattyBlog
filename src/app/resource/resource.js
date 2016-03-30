(function() {
  'use strict';

  angular.module('sf_blog.resources')

  .factory('Api', Api)

  Api.$inject = ['$resource', 'serverUrl'];

  function Api($resource, serverUrl) {

    var API = {};

    /**
     * 文章接口
     */

    API['Article'] = $resource(serverUrl + '/article/:id/:controller', {}, {
      getFrontBlogList: {
        method: 'GET',
        params: {
          id: 'getFrontArticleList'
        }
      },
      getFrontBlogCount: {
        method: 'GET',
        params: {
          id: 'getFrontArticleCount'
        }
      },
      getFrontArticle: {
        method: 'GET',
        params: {
          controller: 'getFrontArticle'
        }
      },
      getIndexImage: {
        method: 'GET',
        params: {
          id: 'getIndexImage'
        }
      },
      toggleLike: {
        method: 'PUT',
        params: {
          controller: 'toggleLike'
        }
      },
      getPrenext: {
        method: 'GET',
        params: {
          controller: 'getPrenext'
        }
      }
    });

    /**
     * 标签接口
     */
    API['Tag'] = $resource(serverUrl + '/tags/:id/:controller', {}, {
      getFrontTagList: {
        method: 'GET',
        params: {
          id: 'getFrontTagList'
        }
      }
    });

    return API;

  }

})();