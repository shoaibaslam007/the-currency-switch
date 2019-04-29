/* eslint-disable */
const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-minify-css');
const glob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');

gulp.task('pages', () => {
  return gulp
    .src('src/*.html')
    .pipe(gulp.dest('dist'))
});

gulp.task('sass', () => {
  return gulp
    .src('src/sass/*.scss')
    .pipe(glob())
    .pipe(
      sass({
        includePaths: ['./node_modules']
      })
    )
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
      .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('image', () => {
  return gulp
    .src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('scripts', () => {
  return gulp
    .src(['src/js/*.js'])
    .pipe(gulp.dest('dist/js'));
});

gulp.task('browsersync', () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch(
    ['src/*.html', 'src/sass/**/*.scss', 'src/images/*'],
    ['build', browserSync.reload]
  );
});

gulp.task('build', ['pages', 'sass', 'image', 'scripts']);
gulp.task('server', ['browsersync']);
gulp.task('default', ['build']);
