var gulp = require('gulp'); 
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('js', function() {
    gulp.src([
            '../phone-mask.js'
        ])
        .pipe(concat('phone-mask.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../'));
});