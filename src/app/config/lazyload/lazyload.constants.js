(function () {
    'use strict';

    angular
            .module('sf_blog')
            .constant('APP_REQUIRES', {
                // jQuery based and standalone scripts
                scripts: {},
                // Angular based script (use the right module name)
                modules: [{
                        name: 'highlight',
                        files: ['http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js']
                    }, {
                        name: 'simple-line-icons',
                        files: ['vendor/simple-line-icons/css/simple-line-icons.css']
                    }
                ]

            });

})();