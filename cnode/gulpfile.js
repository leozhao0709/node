const gulp = require("gulp");
const del = require("del");
const gutil = require("gulp-util");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const fs = require("fs");
const path = require("path");
const shell = require("gulp-shell");

gulp.task("default", ["watch-public", "watch-views", "watch-ts"]);

const pipelog = notify.withReporter(() => {
    // console.log("Title:", options.title);
    // console.log("Message:", options.message);
    // callback();
});

// pipelog.logLevel(2);

const cleanFolder = (folderPath) => {
    try {
        var stats = fs.statSync(folderPath);
        del.sync(folderPath);
        gutil.log(gutil.colors.green(`clean ${path.basename(folderPath)} folder`));
    } catch (err) {
        gutil.log(gutil.colors.yellow(`${path.basename(folderPath)} folder not exists yet, no need to clean`));
    };
}

gulp.task("typescriptBuild", () => {
        gutil.log(gutil.colors.italic.red(`cleaning old ts build file`));
        del.sync(["./build/app/*.js", "!./build/app/public/*.js"]);
        gutil.log(gutil.colors.italic.red(`finish clean`));

        gulp.src(["./app/**/*.ts"])
            .pipe(plumber())
            // .on("end", () => {gutil.log(gutil.colors.italic.green(`compiling typescript file`))})
            .pipe(shell([
                "tsc --rootDir app"
            ]))
            // .on("end", () => {gutil.log(gutil.colors.italic.green(`typescript files compile finish`))})
            ;
});

gulp.task("watch-ts", () => {
    gulp.watch(["app/**/*.ts"], ["typescriptBuild"])
});

gulp.task("copyPublic", () => {
    cleanFolder(path.join(__dirname, "./build/app/public/"));
    gulp.src(["./app/public/**", "!./app/public/stylesheets/{scss,scss/**}"])
        .pipe(plumber())
        .pipe(gulp.dest("./build/app/public"));
})

gulp.task("watch-public", () => {
    gulp.watch(["app/public/**"], ["copyPublic"])
});

gulp.task("copyViews", () => {
    cleanFolder(path.join(__dirname, "./build/app/views/"));
        gulp.src(["./app/views/**"])
            .pipe(plumber())
            .pipe(gulp.dest("./build/app/views"));
})

gulp.task("watch-views", () => {
    gulp.watch(["app/views/**"], ["copyViews"])
});