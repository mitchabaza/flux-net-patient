/// <vs AfterBuild='default:browserify, default:css' />

var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

var createbundler = function() {
    
    var bundler = browserify({
        entries: ['./app/js/app.js'], // Only need the root js file, browserify finds the dependencies
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: false, // include sourcemapping for minified scripts?
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    return bundler;
}
gulp.task('js', function() {

    var bundler = createbundler();

    bundler.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
        .pipe(uglify())
        // Create the initial bundle when starting the task
        .pipe(gulp.dest('../WebApplication/app/js'));


});

gulp.task('js-dev', function () {
    
    var watcher = watchify(createbundler());
    
    return watcher
    .on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle().pipe(source('bundle.js'))
        .pipe(buffer())// <----- convert from streaming to buffered vinyl file object
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


var runcss = function () {
    gulp.src('./app/css/*.css')
            .pipe(concat('main.css'))
            .pipe(gulp.dest('../WebApplication/app/css'));
};

var runimages = function () {
    gulp.src('./app/img/*.*')
            .pipe(gulp.dest('../WebApplication/app/img'));
};
gulp.task('styles', function() {

   
    runcss();
    runimages();

});
gulp.task('styles-dev', function() {
    runcss();

    gulp.watch('./app/css/*.css', runcss);

    runimages();
    gulp.watch('./app/css/*.css', runimages);

});

// Just running the two tasks
gulp.task('build-dev', ['js-dev', 'styles-dev']);

// Just running the two tasks
gulp.task('build', ['js', 'styles']);