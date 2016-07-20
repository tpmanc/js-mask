var gulp = require('gulp'); 
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('js', function() {
    gulp.src([
            '../js-mask.js'
        ])
        .pipe(concat('js-mask.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../'));
});