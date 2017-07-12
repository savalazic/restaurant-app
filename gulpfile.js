var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync').create();

gulp.task('styles', function() {
  gulp.src('./src/static/css/app.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./public/css'))
});


gulp.task('watch', function () {
  gulp.watch('**/*.styl', ['styles'])
});

gulp.task('default', ['watch']);