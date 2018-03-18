const gulp = require("gulp");
const webpack = require('webpack-stream');
const plumber = require("gulp-plumber");

gulp.task('default', ['firstTimebuild', 'webpack']);

gulp.task('firstTimebuild', () => {
  gulp.src('src/index.ts')
    .pipe(plumber())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/'));
});

gulp.task('webpack', () => {
  gulp.watch(['./src/**/*.ts'], () => {
    gulp.src('src/index.ts')
      .pipe(plumber())
      .pipe(webpack(require('./webpack.config.js')))
      .pipe(gulp.dest('dist/'));
  })
});