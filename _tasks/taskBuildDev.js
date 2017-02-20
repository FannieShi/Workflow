/**
 * Created by Fannie Shi on 2017/2/20.
 */
var gulp = require('gulp'),
    less = require('gulp-less'),
    sass = require('gulp-sass'),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    minifyCSS = require('gulp-minify-css');

//注册 build_dev 任务
gulp.task('useref', function(){
    return gulp.src('**/html/*.html')
        .pipe(gulp.dest('./dev/'))
});
