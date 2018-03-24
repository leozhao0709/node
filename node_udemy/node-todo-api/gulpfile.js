const gulp = require("gulp");
const plumber = require("gulp-plumber");
const del = require("del");
const fs = require("fs");
const path = require("path");
const ts = require('gulp-typescript');
const gutil = require("gulp-util");
const notify = require("gulp-notify");


gulp.task("default", [
    "build"
]);

const pipelog = notify.withReporter(() => {
    // console.log("Title:", options.title);
    // console.log("Message:", options.message);
    // callback();
});

const tsProject = ts.createProject('tsconfig.json');

const cleanFolder = (folderPath) => {
    try {
        var stats = fs.statSync(folderPath);
        del.sync(folderPath);
        gutil.log(gutil.colors.italic.red(`clean ${path.basename(folderPath)} `));
    } catch (err) {
        gutil.log(gutil.colors.italic.red(`${path.basename(folderPath)} not exists yet, no need to clean`));
    };
};

const copyPackageJson = () => {
    gulp.src(["package.json"])
        .pipe(plumber())
        .on('end', () => {
            gutil.log(gutil.colors.yellow(`copy package.json now`))
        })
        .pipe(
            gulp.dest("./dist")
        )
        ;
}

const copyAssets = () => {
    gulp.src(["./src/assets/**"])
        .pipe(plumber())
        .pipe(pipelog("copy assets static file: <%= file.relative %>"))
        .pipe(gulp.dest(`./dist/assets`))
        .pipe(pipelog({
            message: "all assets static files compile finish",
            onLast: true
        }))
};

const copyConfig = () => {
    gulp.src(["./src/config/**"])
        .pipe(plumber())
        .pipe(pipelog("copy config file: <%= file.relative %>"))
        .pipe(gulp.dest(`./dist/config`))
        .pipe(pipelog({
            message: "all config files compile finish",
            onLast: true
        }))
};

const buildAllTypeScript = () => {
    gulp.src(["./src/**/*.ts", "!./node_modules/**/*.ts"])
        .pipe(plumber())
        .pipe(pipelog("compile typescript file: <%= file.relative %>"))
        .pipe(
            tsProject()
        )
        .pipe(
            gulp.dest("./dist/")
        )
        .pipe(pipelog({
            message: "all typescript files compile finish",
            onLast: true
        }));
};

gulp.task("build", () => {
    cleanFolder("./dist");
    copyPackageJson();
    copyConfig();
    copyAssets();
    buildAllTypeScript();
});
