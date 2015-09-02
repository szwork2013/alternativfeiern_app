var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var assign = require('lodash.assign');

var watchify = require('watchify');
var browserify = require('browserify');
var reactify = require('reactify');
var server = require('gulp-develop-server');

var livereload = require('gulp-livereload');

const bp = './assets/react/';


var browserifyOpts = {
  debug : true,
  transform : [reactify],
  cache : {},
  packageCache : {},
  fullPaths : true,
  entries : []
};
gulp.task('allReact', ['frontpage', 'locations', 'festivals', 'newsletter', 'admin']);

gulp.task('frontpage', function(){
  browserifyOpts.entries[0] = bp + 'home/main.jsx';
  var bundler = browserify(browserifyOpts);
  var watcher = watchify(bundler);
  return watcher
    .on('update', function(){
      var updateStart = Date.now();
      console.log('Updating!');
      watcher.bundle()
        .pipe(source('frontpage.js'))
        .pipe(gulp.dest('./assets/js/'));
      console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .pipe(source('frontpage.js'))
    .pipe(gulp.dest('./assets/js/'));
});

gulp.task('locations', function(){
  browserifyOpts.entries[0] = bp + 'locations/main.jsx';
  var bundler = browserify(browserifyOpts);
  var watcher = watchify(bundler);
  return watcher
    .on('update', function(){
      var updateStart = Date.now();
      console.log('Updating!');
      watcher.bundle()
        .pipe(source('locations.js'))
        .pipe(gulp.dest('./assets/js/'));
      console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .pipe(source('locations.js'))
    .pipe(gulp.dest('./assets/js/'));
});

gulp.task('festivals', function(){
  browserifyOpts.entries[0] = bp + 'festivals/main.jsx';
  var bundler = browserify(browserifyOpts);
  var watcher = watchify(bundler);
  return watcher
    .on('update', function(){
      var updateStart = Date.now();
      console.log('Updating!');
      watcher.bundle()
        .pipe(source('festivals.js'))
        .pipe(gulp.dest('./assets/js/'));
      console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .pipe(source('festivals.js'))
    .pipe(gulp.dest('./assets/js/'));
});

gulp.task('newsletter', function(){
  browserifyOpts.entries[0] = bp + 'newsletter/main.jsx';
  var bundler = browserify(browserifyOpts);
  var watcher = watchify(bundler);
  return watcher
    .on('update', function(){
      var updateStart = Date.now();
      console.log('Updating!');
      watcher.bundle()
        .pipe(source('newsletter.js'))
        .pipe(gulp.dest('./assets/js/'));
      console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .pipe(source('newsletter.js'))
    .pipe(gulp.dest('./assets/js/'));
});

gulp.task('admin', function(){
  browserifyOpts.entries[0] = bp + 'admin/main.jsx';
  var bundler = browserify(browserifyOpts);
  var watcher = watchify(bundler);
  return watcher
    .on('update', function(){
      var updateStart = Date.now();
      console.log('Updating!');
      watcher.bundle()
        .pipe(source('dashboard.js'))
        .pipe(gulp.dest('./assets/js/'));
      console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .pipe(source('dashboard.js'))
    .pipe(gulp.dest('./assets/js/'));
});
