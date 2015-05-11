/// <vs SolutionOpened='build-dev' />
var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var colors = require('colors');
var createBundles, createBundle;

var files = [
    {
        input: ['./form/app.js'],
        output: 'form.js',
        extensions: ['.js'],
        destination: '../WebApplication/app/js/'
    }, {
        input: ['./worklist/app.js'],
        output: 'worklist.js',
        extensions: ['.js'],
        destination: '../WebApplication/app/js/'
    }
];
createBundle = function (options) {
    var  rebundle;
    var bundler = createDirtyBundle(options.input);
   
    rebundle = function () {
        var startTime;
        startTime = new Date().getTime();
        return bundler.bundle().on('error', function () {
            return console.log(arguments);
        }).pipe(source(options.output)).pipe(buffer()).pipe(gulp.dest(options.destination)).on('end', function () {
            var time;
            time = (new Date().getTime() - startTime) / 1000;
            return console.log(options.output.cyan + " was browserified: " + (time + 's').magenta);
        });
    };
    if (global.isWatching) {
        bundler.on('update', rebundle);
    }
    return rebundle();
};

createBundles = function (bundles) {
    return bundles.forEach(function (bundle) {
        return createBundle({
            input: bundle.input,
            output: bundle.output,
            extensions: bundle.extensions,
            destination: bundle.destination
        });
    });
};

var createDirtyBundle = function(input) {
    
    var reactifyES6 = function (file) {
        return reactify(file, { 'es6': true });
    };

    var bundler = browserify({
        entries: [input], // Only need the root js file, browserify finds the dependencies
        transform: [reactifyES6], // We want to convert JSX to normal javascript
        debug: false, // include sourcemapping for minified scripts?
        cache: {},
        packageCache: {},
        fullPaths: true // Requirement of watchify
    });
    var returnVal=global.isWatching ? watchify(bundler) : bundler;
    return returnVal;
}
 

 
var runcss = function() {
    gulp.src('./assets/css/*.css')
        .pipe(concat('final.css'))
        .pipe(gulp.dest('../WebApplication/assets/css'));
};

var runimages = function() {
    gulp.src('./assets/img/*.*')
        .pipe(gulp.dest('../WebApplication/assets/img'));
};
gulp.task('bundleAssets', function() {
    
    var all = function() {
        
        runcss();
        runimages();
    }

    all();
    if (global.isWatching) {
        gulp.watch('./assets/**/*.*', all);
    }
});
 

gulp.task('setWatch', function () {

    global.isWatching = true;
})
gulp.task('bundleJs', function() {

    return createBundles(files);
})
// Just running the two tasks
gulp.task('build-dev',  [ 'setWatch','bundleJs', 'bundleAssets']);
gulp.task('build', ['bundleJs', 'bundleAssets']);
