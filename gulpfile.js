var gulp = require('gulp');
var concat = require('gulp-concat');
var fs = require('fs'),
    path = require('path');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var jsValidate = require('gulp-jsvalidate');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var fixmyjs = require("gulp-fixmyjs");
var babel = require('gulp-babel');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


gulp.task('vendorsjs', function () {
    return gulp.src(
      [
        'node_modules/jquery/dist/jquery.min.js',
        "node_modules/bootstrap/dist/js/bootstrap.min.js",
        "node_modules/angular/angular.min.js",
        "node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js",
        "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angular-aria/angular-aria.min.js',
        'node_modules/angular-animate/angular-animate.min.js',
        'node_modules/angular-material/angular-material.min.js',
        'node_modules/angular-material-icons/angular-material-icons.js',
        'node_modules/angular-breadcrumb/release/angular-breadcrumb.min.js'
      ])
        .pipe(concat('vendors.min.js'))
        .pipe(gulp.dest('dist/libs'));
});

gulp.task('vendorscss', function () {
    return gulp.src(
      [
        'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/angular/angular-csp.css',
        "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css",
        'node_modules/angular-material/angular-material.css',
        'node_modules/angular-material-icons/angular-material-icons.min.js'
      ])
        .pipe(concat('vendors.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('vendors', ['vendorscss', 'vendorsjs'], function () {
});


function onError(err) {
    console.log(err);
    this.emit('end');
}

gulp.task('fixjs', function () {
    var walk = function (dir) {
        var results = []
        var dirs = [dir];
        var list = fs.readdirSync(dir)
        list.forEach(function (file) {
            file = dir + '/' + file
            var stat = fs.statSync(file)
            if (stat && stat.isDirectory()) dirs = dirs.concat(walk(file))
        })
        return dirs;
    }
    var dirsToTraverse = ['app'];
    dirsToTraverse.forEach(function (rootDir) {
        var queue = walk(rootDir);
        console.log(queue);
        queue.forEach(function (dir) {
            gulp.src(dir + '/*.js')
            .pipe(fixmyjs({
                eqeqeq: false
            }))
            .pipe(gulp.dest(dir));
        })
    })

});


gulp.task('browserify', function() {
  return browserify({entries:'app/index.js',  debug: true})
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .on('error', onError)
        .pipe(source('all.js'))
        .on('error', onError)
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/libs/'));
})

gulp.task('less', function(){
    return gulp.src(['app/**/*.less'])
        .pipe(less())
        .on('error', onError)
           .pipe(concat('all.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function () {
    gulp.watch([
        'app/**/*.js',
        'app/**/*.less'
    ], ['default']).on('error', onError);
});

gulp.task('default', ['vendors','browserify','less']);
