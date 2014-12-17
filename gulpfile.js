var gulp = require('gulp'),
    jade = require('gulp-jade'),
    styl = require('gulp-stylus'),
    nib = require('nib'),
    PATHS = {
      templates: [
        'source/templates/**/*.jade',
        '!source/templates/_*/**/*.jade'
      ],
      javascripts: [
        'source/assets/javascripts/**/*.js'
      ],
      stylesheets: [
        'source/assets/stylesheets/**/*.styl',
        '!source/assets/stylesheets/_*/**/*.styl',
        '!source/assets/stylesheets/**/_*.styl'
      ]
    };

gulp.task('templates', function() {
  return gulp.src(PATHS.templates)
    .pipe(jade())
    .pipe(gulp.dest('www/'));
});

gulp.task('stylesheets', function() {
  return gulp.src(PATHS.stylesheets)
    .pipe(styl({use: nib()}))
    .pipe(gulp.dest('www/stylesheets'));
});

gulp.task('javascripts', function() {
  return gulp.src(PATHS.javascripts)
    .pipe(gulp.dest('www/javascripts'));
});

gulp.task('watch', function() {
  gulp.watch(PATHS.javascripts[0], ['javascripts']);
  gulp.watch(PATHS.stylesheets[0], ['stylesheets']);
  gulp.watch(PATHS.templates[0], ['templates']);
});

gulp.task('build', ['templates', 'stylesheets', 'javascripts']);
gulp.task('default', ['build', 'watch']);
