var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('scss', function(){
  return gulp.src('app/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
});

gulp.task('default', [ 'scss', 'webserver' ]);
const watcher = gulp.watch('app/scss/*.scss', [ 'scss' ]);

watcher.on('change', (event) => {
  console.log(`Files ${event.type}. Creating CSS file...`);
});
