'use strict'

// === Settings ===
const settings = {
  js: true,
  clean: true,
  scripts: true,
  styles: true,
}

// === Imports ===
const { src, dest, series, watch } = require('gulp');

// === Styles ===
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// === Scripts ===
const uglify = require('gulp-uglify');

// BrowserSync
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

const paths = {
  src: {
    js: './src/js/**/*.js',
    scss: './src/scss/**/*.{scss, sass}',
    copyHtml: './src/*.html',
    copyCss: './src/css/*.css',
    copyImages: './src/images/**/*',
  },
  dist: {
    main: './dist',
    js: './dist/js',
    css: './dist/css',
    images: './dist/images',
  }
};
 
const buildCss = (done) => {
  if (!settings.styles) {
    return done();
  }

  return src(paths.src.scss)
    .pipe(sass({
      outputStyle: 'expanded',
      sourceComments: true
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer(), cssnano() ]))
    .pipe(dest(paths.dist.css))
    .pipe(browserSync.stream())
};

const buildJS = (done) => {
  if (!settings.scripts) {
    return done();
  }

  return src(paths.src.js)
  .pipe(uglify())
  .pipe(dest(paths.dist.js))
  .pipe(browserSync.stream())
}

const copyHTML = () => src(paths.src.copyHtml)
  .pipe(dest(paths.dist.main)
);

  const copyCSS = () => src(paths.src.copyCss)
  .pipe(dest(paths.dist.css)
);

const copyImages = () => src(paths.src.copyImages)
  .pipe(dest(paths.dist.images));

const watchers = () => {
  browserSync.init({
    server: {
      baseDir: './dist',
    }
  });
  watch(paths.src.scss, buildCss);
  watch(paths.src.js, buildJS);
  watch(paths.src.copyHtml, copyHTML).on('change', browserSync.reload);
  watch(paths.src.copyCss, copyCSS).on('change', browserSync.reload);
  watch(paths.src.copyImages, copyImages).on('change', browserSync.reload);
};

exports.default = series(
  buildCss,
  buildJS,
  copyHTML,
  copyImages,
  copyCSS,
);

exports.watch = watchers;