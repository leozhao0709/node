const gulp = require("gulp");
const plumber = require("gulp-plumber");
const del = require("del");
const fs = require("fs");
const path = require("path");
const watch = require("gulp-watch");
const ts = require('gulp-typescript');
const gutil = require("gulp-util");
const notify = require("gulp-notify");


gulp.task("default", [
    "typescriptBuild",
    "modifyAssets"
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
    buildAllTypeScript();
});

gulp.task("typescriptBuild", ["build"], () => {
    watch("./**/*.ts", (file) => {

        if (file.event === "unlink") {
            cleanFolder(`./dist/${path.dirname(file.relative)}/${path.basename(file.relative, "ts")}js`);
        }
        gutil.log(gutil.colors.italic.yellow(`recompiling all typescript now...`));
        buildAllTypeScript();
        gutil.log(gutil.colors.italic.yellow(`finish typescript compile now!`));

    })
});

gulp.task("copyAllAssets", () => {
    cleanFolder("./dist/assets");
    gulp.src(["./src/assets/**"])
        .pipe(plumber())
        .pipe(pipelog("copy assets static file: <%= file.relative %>"))
        .pipe(gulp.dest(`./dist/assets`))
        .pipe(pipelog({
            message: "all assets static files compile finish",
            onLast: true
        }))
});

gulp.task("modifyAssets", ["copyAllAssets"], () => {

    watch(["./src/assets/**"], [], (file) => {
        if (file.event === "unlink") {
            cleanFolder(`./dist/assets/${path.dirname(file.relative)}/${path.basename(file.relative)}`);
        } else {
            gulp.src(file.path)
                .pipe(plumber())
                .pipe(pipelog("modify assets static file: <%= file.relative %>"))
                .pipe(gulp.dest(`./dist/assets/${path.dirname(file.relative)}`))
                .pipe(pipelog({
                    message: "assets static file modify finish: <%= file.relative %>",
                    onLast: true
                }));
        }
    })
});