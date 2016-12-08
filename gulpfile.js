
var gulp = require('gulp');
var connect = require('gulp-connect');
var gls = require("gulp-live-server");
var del = require('del');
var sass = require('gulp-sass');
var KarmaServer = require('karma').Server;
var karma = require("gulp-karma-runner");

var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var spritesmith = require('gulp.spritesmith');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var ngAnnotate = require('browserify-ngannotate');
var compass = require("gulp-compass");

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

var url = require('url');
var ps = require("ps-node");


gulp.task("server-start", function(){
    //1. run your script as a server
    var server = gls.new('server/index.js');
    server.start();

    // Note: try wrapping in a function if getting an error like `TypeError: Bad argument at TypeError (native) at ChildProcess.spawn`
    gulp.watch("server/index.js", function() {
        server.start.bind(server)()
    });
});

gulp.task("clean", function(){
    return del(["./dist"])
});

gulp.task('sass', function() {
    return gulp.src('./main/src/styles/**/*.*')
        .pipe(sourcemaps.init())
        .pipe(compass({
            config_file: "./compass-config.rb",
            sass:        "./main/src/styles"
        }))
        .pipe(autoprefixer())

        //.pipe(cachebust.resources())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-template-cache', function() {
    
    var ngHtml2Js = require("gulp-ng-html2js"),
        concat = require("gulp-concat");
    
    return gulp.src("./main/src/**/*.html")
        .pipe(ngHtml2Js({
            moduleName: "adPartials",
            prefix: "/partial/"
        }))
        .pipe(concat("templateCachePartials.js"))
        .pipe(gulp.dest("./dist"));
});

gulp.task('jshint', function() {
    gulp.src('/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('build-js', function() {
    var b = browserify({
        entries: './main/src/app.js',
        debug: true,
        paths: ['./main/src/controllers', './main/src/services', './main/src/directives'],
        transform: [ngAnnotate]
    });

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        //.pipe(cachebust.resources())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ["clean",'sass','build-template-cache', 'jshint', "copyStaticFiles", "build-js"], function() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
});

//Copy static files from html folder to build folder
gulp.task("copyStaticFiles", function(){
    return gulp.src("./index.{js, html}")
        .pipe(gulp.dest("./dist"));
});


gulp.task("clean-images", function(){
    return del(["./dist/images"]);
});

//Copy static files from html folder to build folder
gulp.task("copyImages", ["clean-images"] ,function(){
    return gulp.src("./images/*.*")
        .pipe(gulp.dest("./dist/"));
});

//Copy static files from html folder to build folder
gulp.task("copyChartJs", function(){
    return gulp.src("./node_modules/chart.js/dist/Chart.min.js")
        .pipe(gulp.dest("./dist/"));
});

gulp.task('html', function () {
    gulp.src('./dist/*.{html, js}');
});

gulp.task("cleanJs", function () {
    return del(["./dist/*.{js, map}"])
});

// Watch Files For Changes
gulp.task("watch", function() {
    gulp.watch(["./main/src/**/*.js"], ["build"]);
    gulp.watch(["./index.{html,js}"], ["html"]);
    gulp.watch(["./main/src/styles/**/*.scss"], ["sass"]);
    gulp.watch(["./main/src/**/*.html"], ["build-template-cache", "build-js"]);
});

gulp.task('start', ["kill-server", "build","watch", "server-start"]);

/*gulp.task('test', ["build-template-cache",'build-js'], function() {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }).start();
});*/

gulp.task("test", function () {
    gulp.src([
        "dist/*.js",
        "node_modules/angular-mocks/angular-mocks.js",
        "test/*.js"
    ], {"read": false}).pipe(
        karma.server({
            "singleRun": true,
            "frameworks": ["jasmine"],
            "browsers": ["PhantomJS"]
        })
    );
});

gulp.task('default', ['build', "watch"]);

gulp.task("kill-server", function(){
    // A simple pid lookup
    ps.lookup({
        command: 'node',
    }, function(err, resultList ) {
        if (err) {
            throw new Error( err );
        }

        resultList.forEach(function(process){
            if(process.arguments == "server/index.js"){
                console.log("Shutting down server running on port 3000");

                ps.kill(process.pid, {signal: 9}, function(e) {
                    if (e) {
                        throw new Error(e);
                    }
                    else {
                        console.log( 'Process %s has been killed without a clean-up!', process.pid);
                    }
                });
            }
        });
    });
});