var gulp = require('gulp'),
  gulpPlugins = require('gulp-load-plugins'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync'),
  del = require('del'),
  path = require('path'),
  config = require('./config.json'),
  reload = browserSync.reload,
  $ = gulpPlugins(),
  AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

gulp.task('build-styles', function() {
  return gulp.src(config.projectDirectory + '/' + config.cssRawBundle)
    .pipe($.sourcemaps.init())
    .pipe($.stylus())
    .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.temporal/' + config.cssDirectory));
});

gulp.task('templates', function() {
  return gulp.src(config.projectDirectory + '/' + config.jsDirectory + '/**/*.html')
    .pipe($.htmlmin({ collapseWhitespace: true }))
    .pipe($.ngTemplates({
      filename: 'templates.js',
      module: 'templates',
      standalone: true,
      path: function (url) {
        return url.replace(path.dirname(url), '.');
      }
    }))
    .pipe(gulp.dest(config.projectDirectory + '/' + config.jsDirectory));
});

config.jsPaths.push('templates.js');

gulp.task('build-scripts', [ 'templates' ],function() {  
  console.log(config.jsPaths);
  return gulp.src(config.jsPaths.map(function(value) {
    return config.projectDirectory + '/' + config.jsDirectory + '/' + value;
  }))
    .pipe($.sourcemaps.init())
    .pipe($.wrap('(function(angular){\n\'use strict\';\n<%= contents %>})(window.angular);'))
    .pipe($.concat(config.jsBundle))
    .pipe($.ngAnnotate())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.temporal/' + config.jsDirectory));
});

function runServer(build) {

  var baseDirectories = [ '.temporal', config.projectDirectory ];

  if ( build ) {
    baseDirectories = [ 'build' ];
  }

  browserSync({
    open: false,
    notify: false,
    logPrefix: 'Initial Layout',
    server: {
      baseDir: baseDirectories,
      // Middleware for SPA
      middleware: function(req, res, next) {
        if( config.spa ) {
          if(/\S\.{1}(ico|jpg|jpeg|png|svg|css|js|map|ttf|eot|woff|html)/.test(req.url) !== true){
            req.url = '/index.html';
          }
        }
        return next();
      }
    }
  });
}

gulp.task('serve', [ 'build-styles', 'build-scripts' ], function() {
  
  runServer();

  gulp.watch(config.projectDirectory + '/**/*.html', ['build-scripts', reload]);
  gulp.watch(config.projectDirectory + '/**/*.{styl,css}', ['build-styles', reload]);
  gulp.watch(config.projectDirectory + '/**/*.js', ['build-scripts',reload]);
  gulp.watch(config.projectDirectory + '/**/*.{jpg,jpeg,png,gif}', reload);
});

gulp.task('build', [ 'default', 'build-styles', 'build-scripts' ], function(asd) {
  return gulp.src([ '.temporal/**',
      config.projectDirectory + '/**',
      '!' + config.projectDirectory + '/' + config.cssDirectory + '/**',
      '!' + config.projectDirectory + '/' + config.jsDirectory + '/**'
    ])
    .pipe($.if('*.html', $.htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest('build'))
    .pipe($.if('*.css', $.csso() ))
    .pipe($.if('*.js', $.uglify() ))
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function(){
    return del([ 'build/*', '.temporal/*' ]);
});

gulp.task('default', ['clean'], function() {
  runSequence( 'build-styles', 'build-scripts' );
});