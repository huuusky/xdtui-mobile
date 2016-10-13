/**
 * Created by LiKun on 2016/5/4.
 */
"use strict";

var gulp       = require("gulp");
var sass       = require("gulp-sass");
var concat     = require("gulp-concat");
var uglify     = require("gulp-uglify");
var rename     = require("gulp-rename");
var clean      = require("gulp-clean");
var sourcemaps = require("gulp-sourcemaps");

gulp.task("copy:images", function () {
    return gulp.src("./src/images/**")
        .pipe(gulp.dest("./dist/images"));
});

gulp.task("copy:fonts", function () {
    return gulp.src("./src/fonts/*")
        .pipe(gulp.dest("./dist/fonts"));
});

gulp.task("build:js", function () {
    return gulp.src("./src/scripts/*.js")
        .pipe(concat("xdtui-mobile.js"))
        .pipe(gulp.dest("./dist/scripts"))
        .pipe(rename({suffix: ".min"}))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/scripts"));
});

//Output style. Can be nested (default), compact, compressed, or expanded.
gulp.task("build:sass", function () {
    return gulp.src("./src/scss/xdtui-mobile.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: "expanded"}).on("error", sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/stylesheets"));
});

gulp.task("clean", function () {
    return gulp.src("./dist/*", {read: false})
        .pipe(clean());
});

gulp.task("copy", function () {
    gulp.start(["copy:images", "copy:fonts"]);
});

gulp.task("build", function () {
    gulp.start(["build:sass", "build:js"]);
});

gulp.task("watch", function () {
    gulp.watch("./src/scss/*.scss", ["build:sass"]);
});
