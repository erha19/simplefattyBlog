'use strict';

var gutil = require('gulp-util');

exports.paths = {
  src:  'src',
  dist: 'dist',
  tmp:  '.tmp',
  e2e:  'test_e2e',
  env:{

  }
};
exports.modules={
  ConstantModuleName:'sf_blog',
  templateModuleName:'sf_blog'
}

/**
 *  错误处理
 */
exports.errorHandler = function() {
  return function (err) {
    gutil.beep();
    gutil.log(err.toString());
  }
};

