
var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('browserify', function () {
    var bundler = browserify({
        entries: ['./app/js/app.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: false, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher = watchify(bundler);
    
    return watcher
    .on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle().pipe(source('bundle.js'))
        .pipe(buffer())// <----- convert from streaming to buffered vinyl file object
    //    .pipe(uglify())
        .pipe(gulp.dest('../WebApplication/app/js'));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())// <----- convert from streaming to buffered vinyl file object
   // .pipe(uglify())
    // Create the initial bundle when starting the task
    .pipe(gulp.dest('../WebApplication/app/js'));
});

gulp.task('css', function() {
    
    var runcss = function () {
        gulp.src('./app/css/*.css')
          .pipe(concat('main.css'))
          .pipe(gulp.dest('../WebApplication/app/css'));
    };
    runcss();

    gulp.watch('./app/css/*.css', runcss);

    var runimg = function () {
        gulp.src('./app/img/*.*')
          .pipe(gulp.dest('../WebApplication/app/img'));
    };
    runimg ();
    gulp.watch('./app/css/*.css', runimg );

})

// Just running the two tasks
gulp.task('default', ['browserify', 'css']);