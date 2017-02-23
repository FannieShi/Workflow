var src = './src/',
    dev = './dev/',
    dist = './dist/',
    dist_files = dist + '**';

module.exports = {
    src: src,
    dev: dev,
    dist: dist,
    dist_files: dist_files,
    html: {
        src: src + '/*.html',
        dev: dev,
        dist: dist
    },
    plugins: {
        src: src + 'plugins/**/*',
        dev: dev + 'plugins',
        dist: dist + 'plugins'
    },
    sass: {
        src: src + 'css/**/*.scss',
        dev: dev + 'css',
        dist: dist + 'css'
    },
    less: {
        src: src + 'css/**/*.less',
        dev: dev + 'css',
        dist: dist + 'css'
    },
    css: {
        src: src + 'css/**/*.css',
        dev: dev + 'css',
        dist: dist + 'css'
    },
    js: {
        src: src + 'js/**/*.js',
        dev: dev + 'js',
        dist: dist + 'js',
        build_name: 'index.js'
    },
    img: {
        src: src + 'img/**/*',
        dev: dev + 'img',
        dist: dist + 'img'
    },
    sprite: {
        src: src + 'sprite/**/*',
        dev: dev + 'sprite',
        dist: dist + 'sprite'
    }
};