'use strict';

var gulp = require('gulp'),
    inlineCss = require('gulp-inline-css'),
    inky = require('inky'),
    clean = require('gulp-clean'),
    browser = require('browser-sync');



gulp.task('clean', function() {
    return gulp.src('./tmp/**/*.html', { read: false })
        .pipe(clean());
});

gulp.task('css', function() {
    return gulp.src(['./tmp/**/*.html'])
        .pipe(inlineCss())
        .pipe(gulp.dest('./build/'))
        .on('end', function() {
            setTimeout(function() {
                gulp.start('clean');
            }, 50);
        })
})

gulp.task('inky', function() {
    return gulp.src('./html/**/*.html')
        .pipe(inky())
        .pipe(gulp.dest('./tmp/'))
        .on('end', function() {
            setTimeout(function() {
                gulp.start('css');
            }, 50);
        })
})

// Creates a BrowserSync server
gulp.task('server', ['inky'], function() {
    browser.init({
        server: './build'
    });
});


gulp.task('watch', ['inky'], function() {
    gulp.watch('./html/**/*.html', ['inky', browser.reload]);
})

gulp.task('build', ['watch'], function(){
    gulp.run('server');
})

gulp.task('default', ['build'], function() {

})
