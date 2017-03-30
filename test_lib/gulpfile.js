const gulp = require("gulp");
const del = require("del");
const gutil = require("gulp-util");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const watch = require('gulp-watch');
const fs = require("fs");
const path = require("path");
const shell = require("gulp-shell");

gulp.task("default", ["typescriptBuild"]);

const pipelog = notify.withReporter(() => {
    // console.log("Title:", options.title);
    // console.log("Message:", options.message);
    // callback();
});

// pipelog.logLevel(2);


gulp.task("typescriptBuild", () => {
    return watch("./ts/**/*.ts", () => {
        try {
        var stats = fs.statSync(path.join(__dirname, "./target"));
        del.sync("./target");
        gutil.log(gutil.colors.green("clean old build"));
        }
        catch(err) {
            gutil.log(gutil.colors.yellow("target folder not exists yet, no need to clean old build"));
        }

        gulp.src(["./ts/**/*.ts"])
            .pipe(plumber())
            .pipe(pipelog("compile typescript file: <%= file.relative %>"))
            .pipe(shell([
                "tsc --rootDir ts"
            ]))
            .pipe(pipelog({message: "typescript files compile finish", onLast: true}))
            ;
        })   
})


