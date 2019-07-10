var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var bower = require('gulp-bower');

var SOURCEPATHS = {
    sassSource: 'src/scss/*.scss',
    htmlSource: 'src/*.html',
    jsSource: 'src/js/**',
    bowerSource: 'bower_components',
    fontsAwesomeSource: 'bower_components/fontawesome/fonts/**.*',
    fontsSource: 'src/fonts**.*'
}

var APPPATH = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js',
    fonts: 'app/fonts'
}

function bower_files (done) {
    gulp.dest(SOURCEPATHS.bowerSource)
    done();
}

function bower_files(){
    return bower()
        .pipe(gulp.dest(SOURCEPATHS.bowerSource));
};

function icons() {
    return gulp.src(SOURCEPATHS.fontsAwesomeSource)
        .pipe(gulp.dest(SOURCEPATHS.fontsSource))
        .pipe(gulp.dest(APPPATH.fonts));
};

function clean_html (done){
    gulp.src(APPPATH.root + '/*.html', {read: false, force: true})
        .pipe(clean());
    done();
};

function clean_js (done){
    gulp.src(APPPATH.js + '/*.js', {read: false, force: true})
        .pipe(clean());
    done();
}

function sass_files (done){
    gulp.src(SOURCEPATHS.sassSource)
        .pipe(autoprefixer())   
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest(APPPATH.css))
        .pipe(browserSync.stream());
    done();
};

function copy_js (done){
    gulp.src(SOURCEPATHS.jsSource)
        .pipe(gulp.dest(APPPATH.js));
    done();
;}

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
    gulp.watch(SOURCEPATHS.htmlSource, gulp.series(copy, clean_html, reload));
    gulp.watch(SOURCEPATHS.jsSource, gulp.series(copy_js, clean_js));
};

gulp.task("bower", bower_files);
gulp.task("icons", icons);

gulp.task("serve", serve);
gulp.task("sass_files", sass_files);

gulp.task("clean_html", clean_html);
gulp.task("copy", copy);

gulp.task("copy_js", copy_js);
gulp.task("clean_js", clean_js);

gulp.task("watch_files", watch_files);
gulp.task("watch", gulp.series(sass_files, copy_js, copy, clean_html, clean_js, gulp.parallel(serve, watch_files)));

//default task for call all tasks
gulp.task('default', gulp.series("bower","watch"));