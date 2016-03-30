'use strict';

var gulp = require('gulp'),
        config = require('./config'),
        path = require('path'),
        browserSync = require('browser-sync'),
        proxyMiddleware = require('http-proxy-middleware'),
        browserSyncSpa = require('browser-sync-spa'),
        gulpSequence = require('gulp-sequence');

//watch list
gulp.task('watch', ['inject', 'vendor'], function () {
    //监控index.html,和bower.json文件
    gulp.watch([path.join(config.paths.src, '/*.html'), 'bower.json', 'vendor.base.json', 'vendor.json'], ['inject']);
    //监控CSS文件
    gulp.watch([path.join(config.paths.src, '/app/**/*.scss')], function (event) {
        if (event.type === 'changed') {
            gulp.start('styles:compass');
        } else {
            gulp.start('inject');
        }
    });
    //监控JS文件
    gulp.watch([path.join(config.paths.src, '/app/**/*.js')], function (event) {
        if (event.type === 'changed') {
            gulp.start('jshint');
        } else {
            gulp.start('inject');
        }
    });
    //监控html文件
    gulp.watch([
        path.join(config.paths.src, '/app/**/*.html')
    ], function (event) {
        browserSync.reload(event.path);
    });

});


function browserSyncInit(baseDir, open, port) {
    // Only needed for angular apps,angular 正确路由需要
    var onProxyRes = function (proxyRes, req, res) {
        // add custom header to request


        // or log the req
    }
    
    browserSync.use(browserSyncSpa({
        selector: '[ng-app]'
    }));
    browserSync.init({
        startPath: '/',
        port: port || 3000,
        open: open || false,
        server: {
            baseDir: baseDir,
            routes: {
                "/bower_components": "bower_components"
            },
            middleware: [
                proxyMiddleware(['/api'], {onProxyRes: onProxyRes, target: 'http://simplefatty.cn/', changeOrigin: true})
            ]
        }
    });
}

exports.browserSyncInit = browserSyncInit;

gulp.task('serve', ['dev-config', 'watch'], function () {
    browserSyncInit([path.join(config.paths.tmp, '/serve'), config.paths.src], true);
});
gulp.task('serve:dist', ['build'], function () {
    browserSyncInit(config.paths.dist, true);
});