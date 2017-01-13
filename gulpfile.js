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


var cleanTask = function(){
    return new Promise(function(res, rej) {
        del(["./dist","./dist/*","./main/src/templateCachePartials.js"], function(err, failedPaths) {
            res();
        });
    });
};

var sassTask = function() {
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
};

var buildTempCacheTask = function() {
    var ngHtml2Js = require("gulp-ng-html2js"),
        concat = require("gulp-concat");

    return gulp.src("./main/src/**/*.html")
        .pipe(ngHtml2Js({
            moduleName: "adPartials",
            prefix: "/partial/"
        }))
        .pipe(concat("templateCachePartials.js"))
        .pipe(gulp.dest("./main/src/"));
};

var buildTask = function() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
};

var cleanStylesTask = function() {
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
};

var watchTask = function(success, fail) {
    gulp.watch(["./main/src/**/*.js"], ["build"]);
    gulp.watch(["./index.html"], ["static-files"]);
    gulp.watch(["./css/main.css"],["static-css"]);
    gulp.watch(["./main/src/styles/**/*.scss"],["clean-styles"], sassTask);
    gulp.watch(["./main/src/**/*.html"], ["build-template-cache", "build-js"]);
    success();
};

var startServerTask = function(resolve, reject){
    var killit = new Promise(killServer);
    killit.then(() =>{
        //1. run your script as a server
        var server = gls.new('./server/index.js');
        server.start();

        gulp.watch("./server/index.js", function() {
            server.start.bind(server)()
        });

        resolve();
    });
};

var killServer = function(resolve, reject) {
    // A simple pid lookup
    ps.lookup({
        command: 'node',
    }, function (err, resultList) {
        if (err) {
            throw new Error(err);
            reject();
        }

        if (resultList.length > 0) {
            resultList.forEach(function (process) {
                if (process.arguments == "./server/index.js") {
                    console.log("Shutting down server running on port 3000");

                    ps.kill(process.pid, {signal: 9}, function (e) {
                        if (e) {
                            throw new Error(e);
                        }
                        else {
                            console.log('Process %s has been killed without a clean-up!', process.pid);

                        }
                    });
                }
            });
            resolve();
        } else if (resultList.length == 0) {
            resolve();
        } else {
            reject();
        }
    });
};

var killServerTask = function(){
    return new Promise(killServer);
};

var staticFileTask = function() {
    return gulp.src(["./index.html"])
        .pipe(gulp.dest("./dist"));
};

var buildSourceTask = function() {
    var b = browserify({
        entries: './main/src/app.js',
        debug: true,
        paths: ['./main/src/controllers', './main/src/services', './main/src/directives',"./main/src/model"],
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
};

var startTask = function() {
    var ctp = new Promise(cleanTask);
    var watchPromise = new Promise(watchTask);

    return ctp.then(killServerTask)
        .then(buildTempCacheTask)
        .then(sassTask)
        .then(staticFileTask)
        .then(buildSourceTask)
        .then(watchPromise)
        .then(startServerTask);
};

var buildTask = function() {
    var ctp = new Promise(cleanTask);

    return ctp.then(sassTask)
        .then(staticFileTask)
        .then(buildTempCacheTask)
        .then(buildSourceTask);
};

var vendorTask = function() {

};

var cleanStaticTask =  function(){
    return new Promise(function(res, rej) {
        del(["./dist/index.html"], function(err, paths) {
            res();
        });

    });
};

gulp.task("clean", cleanTask);
gulp.task("kill-server", killServerTask);
gulp.task('sass', sassTask);
gulp.task("server-start", startServerTask);
gulp.task("watch", watchTask);
gulp.task('build', ["clean","build-template-cache","sass", "static-files","build-js"]);
gulp.task('default', ['build', "watch"]);
gulp.task('serve', ["server-start","watch"]);
gulp.task("clean-static",cleanStaticTask);
gulp.task("static-files",["clean-static"], staticFileTask);
gulp.task('build-template-cache', buildTempCacheTask);
gulp.task('clean-dist-css', function(){
    return new Promise(function(res, rej) {
        del(["./dist/main.css"], function(err, paths) {
            res();
        });

    });
});
gulp.task('clean-styles',["clean-dist-css"], cleanStylesTask);
gulp.task("static-css",function(){
    return gulp.src('./css/main.css')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
});
gulp.task('build-js', buildSourceTask);

gulp.task('jshint', function() {
    gulp.src('/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});