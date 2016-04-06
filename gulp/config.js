'use strict';

var gutil = require('gulp-util');

/**
 * [全局路径]
 */

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
 * [依赖配置]
 */
exports.vendor = {
  // 程序启动依赖模块
  base: {
    source: require('../vendor.base.json'),
    dest: 'src/app',
    name: 'vendor'
  },
  
  // 按需加载模块
  app: {
    source: require('../vendor.json'),
    dest: 'src/vendor'
  }
};


/**
 *  [错误处理]
 */
exports.errorHandler = function() {
  return function (err) {
    gutil.beep();
    gutil.log(err.toString());
  }
};


