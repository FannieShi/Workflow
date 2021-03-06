/**
 *  gulp dev 开发环境下
 */
var gulp = require('gulp'),
    rename = require('gulp-rename'),                           //重命名
    sass = require('gulp-sass'),                               //Sass
    less = require('gulp-less'),                               //Less
    jshint = require('gulp-jshint'),                           //js检查
    concat = require('gulp-concat'),                           //合并文件
    imagemin = require('gulp-imagemin'),                       //图片压缩
    del = require('del'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    Config = require('./gulpfile.config.js');

module.exports = function () {
    /**
     * HTML处理
     */
    function copyHtml() {
        return gulp.src(Config.html.src)
            .pipe(gulp.dest(Config.html.dev))
            .pipe(reload({stream: true}));
    }
    /**
     * plugins
     */
    function copyPlugins() {
        return gulp.src(Config.plugins.src)
            .pipe(gulp.dest(Config.plugins.dev))
            .pipe(reload({stream: true}));
    }
    /**
     * CSS样式处理
     */
    function copyCss(){
        return gulp.src(Config.css.src)
            .pipe(gulp.dest(Config.css.dev))
            .pipe(reload({stream: true}));
    }
    /**
     * Sass样式编译
     */
    function compileSass(){
        return gulp.src(Config.sass.src)
            .pipe(sass())
            .pipe(gulp.dest(Config.sass.dev))
            .pipe(reload({stream: true}));
    }
    /**
     * Less样式编译
     */
    function compileLess(){
        return gulp.src(Config.less.src)
            .pipe(less())
            .pipe(gulp.dest(Config.less.dev))
            .pipe(reload({stream: true}));
    }
    /**
     * js处理
     */
    function compileJs(){
        return gulp.src(Config.js.src)
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'))
            .pipe(gulp.dest(Config.js.dev))
            .pipe(reload({stream: true}));
    }
    /**
     * 图片处理
     */
    function compileImg(){
        return gulp.src(Config.img.src)
            .pipe(imagemin({
                optimizationLevel: 3,
                progressive: true,
                interlaced: true
            }))
            .pipe(gulp.dest(Config.img.dev))
            .pipe(reload({stream: true}));
    }
    /**
     * 雪碧图处理
     */
    function copySprite(){
        return gulp.src(Config.sprite.src)
            .pipe(imagemin())
            .pipe(gulp.dest(Config.sprite.dev))
            .pipe(reload({stream: true}));
    }
    /**
     * 监听文件
     */
    function watch(){
        browserSync.init({
            server: {
                baseDir: Config.dev
            },
            notify: false
        });
        gulp.watch(Config.html.src, copyHtml);
        gulp.watch(Config.plugins.src, copyPlugins);
        gulp.watch(Config.css.src, copyCss);
        gulp.watch(Config.sass.src, compileSass);
        gulp.watch(Config.less.src, compileLess);
        gulp.watch(Config.js.src, compileJs);
        gulp.watch(Config.img.src, compileImg);
        gulp.watch(Config.sprite.src, copySprite);
    }
    /**
     * 清空文件
     */
    function delDev() {
        return del([Config.dev]);
    }

    gulp.task('build_dev', gulp.series(
        delDev,
        gulp.parallel(
            copyCss,
            copyPlugins,
            copyHtml,
            copySprite,
            compileSass,
            compileLess,
            compileJs,
            compileImg
        ),
        watch
    ));
};
