// gulpfile.js
var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
  browserify({
    entries: 'app.jsx',
    extensions: ['.jsx', '.js'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('singlepage.js'))
  .pipe(gulp.dest('../../assets/js/'));
});

gulp.task('watch', function(){
  var bundler = browserify({
    entries : 'app.jsx',
    extensions : ['.jsx', '.js'],
    debug : true,
    verbose : true
  });
  var watcher = watchify(bundler);
  return watcher
          .on('update', function(){
            var start = Date.now();
            watcher
            .transform(babelify)
            .bundle()
            .pipe(source('singlepage.js'))
            .pipe(gulp.dest('../../assets/js/'));
            console.log('Updated!', (Date.now() - start) + 'ms');
          })
          .bundle()
          .pipe(source('singlepage.js'))
          .pipe(gulp.dest('../../assets/js/'));
});

gulp.task('default', ['build']);
