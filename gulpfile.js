var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('serve', ['sass'], function(){
    browserSync.init({
        server:"./"
    });

    gulp.watch('./app/src/sass/*.scss',['sass']);
    gulp.watch('./*.*').on('change', browserSync.reload);
});

gulp.task('sass', function(){
    gulp.src('./app/src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/dist/src/css'));
    
});

gulp.task('default', ['serve']);