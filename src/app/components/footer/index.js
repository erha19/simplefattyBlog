(function() {
	'use strict';

	angular.module('sf_blog').component('sfFooter', {
		templateUrl: 'app/components/footer/footer.html',
		controller: 'footerCtrl',
		controllerAs: 'footer',
		// ,
		// bindings: {
		// }
	})
	.controller('footerCtrl', function() {
	  this.info = 'Simplefatty ©2015-2016  粤ICP备16009462号';
	});

})();