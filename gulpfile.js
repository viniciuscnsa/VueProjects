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

function cleanHtml (done){
    gulp.src(APPPATH.root + '/*.html', {read: false, force: true})
        .pipe(clean());
    done();
};

function sassFiles (done){
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

function serve(done){
    browserSync.init([APPPATH.css+'/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'],{
        server:{
            baseDir: APPPATH.root
        }
    })
    done();
};

function watchFiles(){
    gulp.watch(SOURCEPATHS.sassSource, sassFiles);
    gulp.watch(SOURCEPATHS.htmlSource, copy);
    //gulp.series(sass, copy, cleanHtml, serve);
};

gulp.task("serve", serve);
gulp.task("sassFiles", sassFiles);
gulp.task("copy", copy);
gulp.task("cleanHtml", cleanHtml);
gulp.task("watchFiles", watchFiles);

//default task for call all tasks
gulp.task('default', gulp.series(watchFiles));

/*
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

gulp.task('clean-html', function(){
    return gulp.src(APPPATH.root + '/*.html', {read: false, force: true})
        .pipe(clean());
})

gulp.task('sass', function(){
    return gulp.src(SOURCEPATHS.sassSource)
        .pipe(autoprefixer())   
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest(APPPATH.css))
        .pipe(browserSync.stream());
});

gulp.task('copy', done =>{
    gulp.src(SOURCEPATHS.htmlSource)
        .pipe(gulp.dest(APPPATH.root));
    done();
});

gulp.task('serve', done=>{
    browserSync.init([APPPATH.css+'/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'],{
        server:{
            baseDir: APPPATH.root
        }
    })
    done();
    //gulp.watch(SOURCEPATHS.sassSource, gulp.series('sass'));
    //gulp.watch(APPPATH.root + '/*.html').on('change', browserSync.reload);
});

gulp.task('watch', gulp.series('serve', 'sass', 'copy', 'clean-html'), done=>{
    gulp.watch(SOURCEPATHS.sassSource, gulp.series('sass'));
    gulp.watch(SOURCEPATHS.htmlSource, gulp.series('copy'));
    done();
})

gulp.task('default', gulp.series('watch'));
*/