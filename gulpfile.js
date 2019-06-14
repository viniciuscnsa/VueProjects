var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var SOURCEPATHS = {
    sassSource: 'src/scss/*.scss'
}

var APPPATH = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js'
}

gulp.task('sass', function(){
    return gulp.src(SOURCEPATHS.sassSource)
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest(APPPATH.css))
        .pipe(browserSync.stream());
});

gulp.task('serve', function(){
    browserSync.init([APPPATH.css+'/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'],{
        server:{
            baseDir: APPPATH.root
        }
    })
    gulp.watch(SOURCEPATHS.sassSource, gulp.series('sass'));
    gulp.watch(APPPATH.root + '/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('serve'));