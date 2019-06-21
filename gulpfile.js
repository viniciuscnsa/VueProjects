var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');

var SOURCEPATHS = {
    sassSource: 'src/scss/*.scss',
    htmlSource: 'src/*.html'
}

var APPPATH = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js'
}

function clean_html (done){
    gulp.src(APPPATH.root + '/*.html', {read: false, force: true})
        .pipe(clean());
    done();
};

function sass_files (done){
    gulp.src(SOURCEPATHS.sassSource)
        .pipe(autoprefixer())   
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest(APPPATH.css))
        .pipe(browserSync.stream());
    done();
};

function copy (done){
    gulp.src(SOURCEPATHS.htmlSource)
        .pipe(gulp.dest(APPPATH.root));
    done();
};

function serve(){
    browserSync.init([APPPATH.css+'/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'],{
        server:{
            baseDir: APPPATH.root
        }
    })
};

function watch_files(){
    gulp.watch(SOURCEPATHS.sassSource, sass_files);
    gulp.watch(SOURCEPATHS.htmlSource, copy, reload);
};

gulp.task("serve", serve);
gulp.task("sass_files", sass_files);
gulp.task("copy", copy);
gulp.task("clean_html", clean_html, gulp.series(copy));
gulp.task("watch_files", watch_files);
gulp.task("watch", gulp.parallel(serve, watch_files))

//default task for call all tasks
gulp.task('default', gulp.series("watch"));