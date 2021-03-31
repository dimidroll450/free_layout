'use strict'
const { src, dest, series, watch } = require('gulp');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

sass.compiler = require('node-sass');

const paths = {
  scss: './src/scss/*.{scss, sass}',
  copyHtml: './src/*.html',
  copyCss: './src/css/*.css',
}
 
const scssTask = () => (
  src(paths.scss)
    .pipe(sass())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('./dist/css'))
);

const copyHTML = () => src(paths.copyHtml)
  .pipe(dest('./dist'))

  const copyCSS = () => src(paths.copyCss)
  .pipe(dest('./dist/css'))

const watchTask = () => {
  watch(paths.scss, ['sass']);
}

exports.default = series(
  scssTask,
  copyHTML,
  copyCSS,
)