/**
 * Gulp dist 打包资源
 */
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),               //处理CSS中浏览器兼容的前缀
    rename = require('gulp-rename'),                           //重命名
    cssnano = require('gulp-cssnano'),                         //CSS的层级压缩合并
    sass = require('gulp-sass'),                               //Sass
    less = require('gulp-less'),                               //Less
    jshint = require('gulp-jshint'),                           //js检查
    uglify = require('gulp-uglify'),                           //js压缩
    concat = require('gulp-concat'),                           //合并文件
    imagemin = require('gulp-imagemin'),                       //图片压缩
    tmtsprite = require('gulp-tmtsprite'),                     //雪碧图合成
    gulpif = require('gulp-if'),
    del = require('del'),
    Config = require('./gulpfile.config.js');

module.exports = function () {
    /**
     * HTML 处理
     */
    function copyHtml() {
        return gulp.src(Config.html.src)
            .pipe(gulp.dest(Config.html.dist));
    };
    /**
     * Plugins
     */
    function copyPlugins() {
        return gulp.src(Config.plugins.src)
            .pipe(gulp.dest(Config.plugins.dist));
    };
    /**
     * CSS 样式处理
     */
    function compileCss(){
        return gulp.src(Config.css.src)
            .pipe(autoprefixer({browsers: ['last 2 versions', 'Android >= 4.0']}))
            .pipe(gulp.dest(Config.css.dist))
            .pipe(rename({ suffix: '.min'}))
            .pipe(cssnano())
            .pipe(gulp.dest(Config.css.dist));
    };
    /**
     * Sass 编译
     */
    function compileSass() {
        return gulp.src(Config.sass.src)
            .pipe(autoprefixer({browsers: ['last 2 versions', 'Android >= 4.0']}))
            .pipe(sass())
            .pipe(gulp.dest(Config.sass.dist));
    };
    /**
     * Less 编译
     */
    function compileLess() {
        return gulp.src(Config.less.src)
            .pipe(autoprefixer({browsers: ['last 2 versions', 'Android >= 4.0']}))
            .pipe(less())
            .pipe(rename({ suffix: '.min'}))
            .pipe(cssnano())
            .pipe(gulp.dest(Config.less.dist));
    };
    /**
     * 压缩所有的CSS文件
     */
    function minCss() {
        return gulp.src([Config.css.dist + '/**/*.css', '!' + Config.css.dist +'/**/*.min.css'])
            .pipe(rename({ suffix: '.min'}))
            .pipe(cssnano())
            .pipe(gulp.dest(Config.css.dist));
    }
    /**
     * js 处理
     */
    function compileJs() {
        return gulp.src(Config.js.src)
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'))
            .pipe(gulp.dest(Config.js.dist))
            .pipe(rename({ suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest(Config.js.dist));
    };
    /**
     * 合并所有js文件并做压缩处理
     */
    function concatJs() {
        return gulp.src(Config.js.src)
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'))
            .pipe(concat(Config.js.build_name))
            .pipe(gulp.dest(Config.js.dist))
            .pipe(rename({ suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest(Config.js.dist));
    };
    /**
     * 图片处理
     */
    function compileImg() {
        return gulp.src(Config.img.src)
            .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
            .pipe(gulp.dest(Config.img.dist));
    };
    /**
     * 雪碧图处理
     */
    function compileSprite() {
        return gulp.src(Config.css.dev + '/**/*.css')
            .pipe(tmtsprite({slicePath: '../sprite'}))
            .pipe(gulpif('*.png', gulp.dest(Config.sprite.dist), gulp.dest(Config.css.dist)));
    };
    /**
     * 清空文件
     */
    function delDist(){
        return del(Config.dist);
    }

    gulp.task('build_dist', gulp.series(
        delDist,
        gulp.parallel(
            copyPlugins,
            copyHtml,
            compileImg,
            compileSass,
            compileLess,
            compileCss,
            concatJs
        ),
        compileJs,
        compileSprite,
        minCss
    ))
}
