var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');

gulp.task('bundle', function() {
  return browserify('./src/app.js')
  .transform("babelify", {presets: ['es2015', 'react']})
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function() {
  var b = browserify({
    entries: ['./src/app.js'],
    cache: {}, packageCache: {},
    plugin: ['watchify']
  });

  b.on('update', makeBundle);

  function makeBundle() {
    b.transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .on('error', function(err) {
      console.error(err.message);
      console.error(err.codeFrame);
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/'));
    console.log("Bundle updated, success");
  }

  makeBundle();
  return b;
});
