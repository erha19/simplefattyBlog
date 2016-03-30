'use strict';

var gulp = require('gulp');
var path = require('path');
var config = require('./config');
var _ = require('lodash');
var wiredep = require('wiredep').stream;
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del','imagemin-pngquant']
});
gulp.task('clean:dist', function () {
  $.del([path.join(config.paths.dist, '/')]);
});
// VENDOR CONFIG
var vendor = {
  // vendor scripts required to start the app
  base: {
    source: require('../vendor.base.json'),
    dest: 'src/app',
    name: 'vendor'
  },
  // vendor scripts to make the app work. Usually via lazy loading
  app: {
    source: require('../vendor.json'),
    dest: 'src/vendor'
  }
};
/*****************angular template start*********************************************/

gulp.task('partials', function () {
  return gulp.src([
    path.join(config.paths.src, '/app/**/*.html')
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: config.modules.templateModuleName,
      root: 'app'
    }))
    .pipe(gulp.dest(config.paths.tmp + '/partials/'));
});
/*****************angular template end*********************************************/

/*****************concat (js,css,html)*********************/
gulp.task('html',['inject','partials'],function () {
	var partialsInjectFile = gulp.src(path.join(config.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
	var partialsInjectOptions = {
	  starttag: '<!-- inject:partials -->',
	  ignorePath: path.join(config.paths.tmp, '/partials'),
	  addRootSlash: false
	};

	var htmlFilter = $.filter('*.html',{restore: true});
	var jsFilter = $.filter('**/*.js',{restore: true});
	var cssFilter = $.filter('**/*.css',{restore: true});

	return gulp.src(path.join(config.paths.tmp, '/serve/index.html'))
		//error 
		.pipe($.plumber(config.errorHandler()))
		//inject template
		.pipe($.inject(partialsInjectFile,partialsInjectOptions))
		//js
		.pipe($.useref())
		.pipe(jsFilter)
		.pipe($.stripDebug())
		.pipe($.uglify())
		.pipe(jsFilter.restore)
		//css 
		.pipe(cssFilter)
		.pipe($.autoprefixer({
			browsers: ['last 20 versions'],
			cascade: false
		}))
		.pipe($.csso())
		.pipe(cssFilter.restore)
		//md5后缀
		.pipe($.if('*.css', $.rev()))
		.pipe($.if('*.js', $.rev()))
		//替换md5后缀的文件名
		.pipe($.revReplace())
		//html处理
		.pipe(htmlFilter)
		.pipe($.minifyHtml({
		  empty: true,
		  spare: true,
		  quotes: true,
		  conditionals: true
		}))
		.pipe(htmlFilter.restore)
		.pipe(gulp.dest(path.join(config.paths.dist, '/')))
		.pipe($.size({ title: path.join(config.paths.dist, '/'), showFiles: true }));

});


/*****************concat (js,css,html) end*********************/

/**
 * images zip
 */
gulp.task('images',function () {
	return gulp.src([
			path.join(config.paths.src, '/assets/images/**/*'),
			path.join('!' + config.paths.src, '/assets/images/sprite/**/*')
		])
		.pipe($.imagemin({
		    progressive: true,
		    svgoPlugins: [{removeViewBox: false}],
		    use: [$.imageminPngquant()]
		}))
		.pipe(gulp.dest(path.join(config.paths.dist,'/assets/images')));
});

gulp.task('fonts',function () {
		
	return gulp.src(vendor.base.source,{base: 'bower_components'})
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
		.pipe($.flatten())
		.pipe(gulp.dest(path.join(config.paths.dist,'/fonts/')));
});
/**
 * copy file
 */
gulp.task('other:vendor',function () {
	return gulp.src([
			path.join(config.paths.src, '/vendor/**/*')
		])
		.pipe($.filter(function (file) {
			return file.stat.isFile();
		}))
		.pipe(gulp.dest(path.join(config.paths.dist,'/vendor')));
});
gulp.task('other:assets',function () {
	return gulp.src([
			path.join(config.paths.src, '/app/assets/**/*')
		])
		.pipe($.filter(function (file) {
			return file.stat.isFile();
		}))
		.pipe(gulp.dest(path.join(config.paths.dist,'/assets')));
});


gulp.task('build',$.sequence('prod-config',['clean:dist','html'],['images','fonts'],'other:vendor','other:assets'));
gulp.task('build:e2e',$.sequence('test-config',['clean:dist','html'],['images','fonts'],'other:vendor','other:assets'));