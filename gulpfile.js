// Gulp utility
var gulp = require("gulp");
var rename = require("gulp-rename");

// Styles
var sass = require("gulp-sass");
var cssmin = require("gulp-cssmin");
var autoprefixer = require("gulp-autoprefixer");
var pxtorem = require("gulp-pxtorem");

// Javascript
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var webpack = require("gulp-webpack");
//var stripDebug   = require('gulp-strip-debug');

// Sprites
var svgSprite = require("gulp-svg-sprite");
var svg2png = require("gulp-svg2png");

// Browser Sync/watch
var watch = require("gulp-watch");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

//***********************************************************************

// CSS
gulp.task("sass", function() {
    return gulp
        .src("./assets/css/src/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(
            autoprefixer({
                browsers: [
                    "last 2 versions",
                    "safari 5",
                    "ie 9",
                    "opera 12.1",
                    "ios 6",
                    "android 4"
                ]
            })
        )
        .pipe(pxtorem())
        .pipe(gulp.dest("./assets/css/build"))
        .pipe(cssmin())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("./assets/css/build"));
});

// Javascript - webpack
gulp.task("webpack", function() {
    return (
        gulp
            .src("./assets/js/src/script.js")
            .pipe(
                webpack({
                    module: {
                        loaders: [
                            {
                                exclude: /node_modules/,
                                loader: "babel-loader",
                                query: {
                                    presets: ["es2015", "stage-2"],
                                    plugins: [
                                        "transform-es3-property-literals",
                                        "transform-es3-member-expression-literals"
                                    ]
                                }
                            }
                        ]
                    },
                    resolve: {
                        extensions: ["", ".js"]
                    },
                    externals: {
                        $: "jQuery",
                        jquery: "jQuery"
                    }
                })
            )
            .pipe(rename("script.min.js"))
            .pipe(uglify())
            .pipe(gulp.dest("./assets/js/build"))
    );
});

// Sprites - SVG, PNG fallback
gulp.task("svgSprite", function() {
    return gulp
        .src("./assets/img/sprite/src/*.svg")
        .pipe(
            svgSprite({
                shape: {
                    spacing: {
                        padding: 5
                    }
                },
                mode: {
                    css: {
                        dest: "./",
                        sprite: "./assets/img/sprite/build/sprite.svg",
                        bust: false,
                        render: {
                            scss: {
                                dest: "./assets/css/src/utils/_sprite-map.scss",
                                template:
                                    "./assets/css/src/utils/_sprite-map_template.scss"
                            }
                        }
                    }
                }
            })
        )
        .pipe(gulp.dest("./"));
});

gulp.task("pngSprite", ["svgSprite"], function() {
    return gulp
        .src("./assets/img/sprite/build/sprite.svg")
        .pipe(svg2png())
        .pipe(gulp.dest("./assets/img/sprite/build/"));
});

// Browser Sync
gulp.task("sync", ["default"], function() {
    browserSync.init({
        proxy: "technipfmc.local" //update this to be the local url of your project
    });
    gulp.watch("./assets/css/src/**/*.scss", ["sass", reload]);
    gulp.watch("./assets/js/src/**/*.js", ["webpack", reload]);
    gulp.watch("./**/*.{htm,html,cshtml,php}").on("change", reload);
});

// Watch - just watches for changes and rebuilds css/js
gulp.task("watch", function() {
    gulp.watch("./assets/js/**/*.js", ["webpack"]);
    gulp.watch("./assets/css/src/**/*.scss", ["sass"]);
});

// Build
gulp.task("default", ["sass", "webpack"]);
gulp.task("sprite", ["pngSprite"]);
