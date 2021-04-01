'use strict'
const { src, dest, series, watch } = require('gulp');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

const paths = {
  scss: './src/scss/**/*.{scss, sass}',
  copyHtml: './src/*.html',
  copyCss: './src/css/*.css',
  copyImages: './src/images/*',
};
 
const scssTask = () => (
  src(paths.scss)
    .pipe(sass())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('./dist/css'))
    .pipe(browserSync.stream())
);

const copyHTML = () => src(paths.copyHtml)
  .pipe(dest('./dist')
);

  const copyCSS = () => src(paths.copyCss)
  .pipe(dest('./dist/css')
);

const copyImages = () => src(paths.copyImages)
  .pipe(dest('./dist/images'));

const watchers = () => {
  browserSync.init({
    server: {
      baseDir: './dist',
    }
  });
  watch(paths.scss, scssTask);
  watch(paths.copyHtml, copyHTML).on('change', browserSync.reload);
  watch(paths.copyCss, copyCSS).on('change', browserSync.reload);
  watch(paths.copyImages, copyImages).on('change', browserSync.reload);
};

exports.default = series(
  scssTask,
  copyHTML,
  copyImages,
  copyCSS,
);

exports.watch = watchers;