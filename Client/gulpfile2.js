var gulp = require("gulp");
var browserify = require("gulp-browserify");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('browserify' , function () {
    return gulp.src(['app/js/app.js'])
        .pipe(browserify({ transform: 'reactify' }))
         .pipe(uglify())
        .pipe(concat('bundle.js'))
    .pipe(gulp.dest('app/js'));
});

gulp.task('copy' , ['browserify'], function () {
    return gulp.src('app/**/*.*')
        .pipe(gulp.dest('../WebApplication/app/'));

});

gulp.task('default', ['browserify', 'copy', 'watch']);

gulp.task('watch', function () {
    gulp.watch('app/js/**/*.jsx', { maxListeners: 999 } , ['default']);
    gulp.watch(['app/js/**/*.js', 'app/**/*.css', 'app/img/*.*' , '!app/js/bundle.js'], { maxListeners: 1999 }, ['default']);
});

 
var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var concat = require('gulp-concat');

gulp.task('browserify', function () {
    var bundler = browserify({
        entries: ['./app/js/app.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher = watchify(bundler);
    
    return watcher
    .on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle()// Create new bundle that uses the cache for high performance
        .pipe(source('app.js'))
         .pipe(concat('bundle.js'))
    // This is where you add uglifying etc.
        .pipe(gulp.dest('../WebApplication/app'));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle()// Create the initial bundle when starting the task
    .pipe(source('main.js'))
    .pipe(gulp.dest('bundle.js'));
});

// I added this so that you see how to run two watch tasks
gulp.task('css', function () {
    gulp.watch('app/**/*.css', function () {
        return gulp.src('app/**/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('../WebApplication/app'));
    });
});

// Just running the two tasks
gulp.task('default', ['browserify', 'css']);