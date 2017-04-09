const gulp = require("gulp");
const del = require("del");
const gutil = require("gulp-util");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const fs = require("fs");
const path = require("path");
const shell = require("gulp-shell");
const watch = require("gulp-watch");
const sass = require("gulp-sass");


const pipelog = notify.withReporter(() => {
    // console.log("Title:", options.title);
    // console.log("Message:", options.message);
    // callback();
});

// pipelog.logLevel(2);

gulp.task("default", ["typescriptBuild", "sassBuild", "modifyPublic", "modifyViews"]);

const cleanFolder = (folderPath) => {
    try {
        var stats = fs.statSync(folderPath);
        del.sync(folderPath);
        gutil.log(gutil.colors.italic.red(`clean ${path.basename(folderPath)} `));
    } catch (err) {
        gutil.log(gutil.colors.italic.red(`${path.basename(folderPath)} not exists yet, no need to clean`));
    };
}

gulp.task("buildAllTypeScript", ()=>{
    cleanFolder("./build/app/")
    gulp.src("./app/**/*.ts")
        .pipe(plumber())
        .pipe(pipelog("compile ts file: <%= file.relative %>"))
        .pipe(shell([
            "tsc --rootDir app"
        ]))
        .pipe(pipelog({message: "all ts files compile finish", onLast: true}))
        ;
})

gulp.task("typescriptBuild", ["buildAllTypeScript"], () => {
    watch("./app/**/*.ts", (file) => {

        if (file.event === "unlink") {
            cleanFolder(`./build/app/${path.dirname(file.relative)}/${path.basename(file.relative, "ts")}js`);
        }
        else {
            gulp.src(file.path)
            .pipe(plumber())
            .pipe(pipelog("compile ts file: <%= file.relative %>"))
            .pipe(shell([
                `tsc app/${path.dirname(file.relative)}/${path.basename(file.relative)} --outdir ./build/app/${path.dirname(file.relative)} --experimentalDecorators --lib es6,dom --target es5`
            ]))
            .pipe(pipelog({message: "ts file compile finish: <%= file.relative %>", onLast: true}))
            ;
        }
    })
});

gulp.task("buildAllSass", [], ()=>{
    cleanFolder("./build/app/public/stylesheets/css");
    gulp.src("./app/public/stylesheets/scss/**/*.scss")
        .pipe(plumber())
        .pipe(pipelog("compile sass file: <%= file.relative %>"))
        .pipe(sass({outputStyle: "expanded"}))
        .on("error", sass.logError)
        .pipe(gulp.dest("./build/app/public/stylesheets/css"))
        .pipe(pipelog({message: "all sass files compile finish", onLast: true}))
        ;
});

gulp.task("sassBuild", ["buildAllSass"], ()=>{
    watch("./app/public/stylesheets/scss/**/*.scss", (file) => {
        if (file.event === "unlink") {
            cleanFolder(`./build/app/${path.dirname(file.relative)}/${path.basename(file.relative, "scss")}css`);
        }
        else {
            gulp.src(file.path)
                .pipe(plumber())
                .pipe(pipelog("compile sass file: <%= file.relative %>"))
                .pipe(sass({outputStyle: "expanded"}))
                .on("error", sass.logError)
                .pipe(gulp.dest("./build/app/public/stylesheets/css"))
                .pipe(pipelog({message: "sass file compile finish: <%= file.relative %>", onLast: true}))
        }
    })
})

gulp.task("copyAllPublic", () => {
    cleanFolder("./build/app/public");
    gulp.src(["./app/public/**", "!./app/public/stylesheets/{scss,scss/**}"])
        .pipe(plumber())
        .pipe(pipelog("copy public static file: <%= file.relative %>"))
        .pipe(gulp.dest(`./build/app/public`))
        .pipe(pipelog({message: "all public static files compile finish", onLast: true}))
})

gulp.task("modifyPublic", ["copyAllPublic"], () => {

    watch(["./app/public/**", "!./app/public/stylesheets/{scss,scss/**}"], [], (file) => {
        if (file.event === "unlink") {
            cleanFolder(`./build/app/public/${path.dirname(file.relative)}/${path.basename(file.relative)}`);
        }
        else {
            gulp.src(file.path)
                .pipe(plumber())
                .pipe(pipelog("modify public static file: <%= file.relative %>"))
                .pipe(gulp.dest(`./build/app/public/${path.dirname(file.relative)}`))
                .pipe(pipelog({message: "public static file modify finish: <%= file.relative %>", onLast: true}))
                ;
        }
    })
})

gulp.task("compileAllViews", () => {
    cleanFolder("./build/app/views");
    gulp.src(["app/views/**"])
        .pipe(plumber())
        .pipe(pipelog("compile views file: <%= file.relative %>"))
        .pipe(gulp.dest(`./build/app/views`))
        .pipe(pipelog({message: "all views files compile finish", onLast: true}))
})

gulp.task("modifyViews", ["compileAllViews"], () => {

    watch(["app/views/**"], [], (file) => {
        if (file.event === "unlink") {
            cleanFolder(`./build/app/views/${path.dirname(file.relative)}/${path.basename(file.relative)}`)
        }
        else {
            gulp.src(file.path)
                .pipe(plumber())
                .pipe(pipelog("modify views file: <%= file.relative %>"))
                .pipe(gulp.dest(`./build/app/views/${path.dirname(file.relative)}`))
                .pipe(pipelog({message: "views file modify finish: <%= file.relative %>", onLast: true}))
                ;
        }
    })
})
