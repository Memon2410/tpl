/* Dependencias
-------------------------------------------------------------------------------*/
var gulp = require('gulp'),
  Orchestrator = require('orchestrator'),
  jade = require('gulp-jade'),
  sass = require('gulp-sass'),
  coffee = require('gulp-coffee'),
  connect = require('gulp-connect'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  js_obfuscator = require('gulp-js-obfuscator'),

  jadeTasks = ['jade'],
  coffeeTasks = ['coffee'],
  stylusTasks = ['sass'],
  obsfucatorTasks = ['obsfucator']
  imagesTasks = ['images'];

/* Paths
-------------------------------------------------------------------------------*/
var path = {
  jade: ['jade/**/*.jade'],
  html: 'public',

  coffee: ['coffee/**/*.coffee'],
  js: 'js/',

  sass: ['sass/**/*.{scss,sass}'],
  css: 'public/assets/css/',

  build: {
    js: 'public/assets/js/',
  },
  src: {
    js: 'js/**/*.js',
  },

  images: ['images/*.{gif,jpg,png,svg}'],
  imgmin: 'public/assets/img/',
  options: {
      optimizationLevel: 3,
      progessive: true,
      interlaced: true
    }
};

/* Configuración de compilacion 'JADE'
-------------------------------------------------------------------------------*/
gulp.task('jade', function() {
  return gulp.src(path.jade)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(path.html))
});

/* Configuración de compilacion 'COFFEE'
-------------------------------------------------------------------------------*/
gulp.task('coffee', function() {
  return gulp.src(path.coffee)
    .pipe(coffee({bare: true}).on('error', function(err){
      console.log(err.name + " en " + err.plugin);
    }))
    .pipe(uglify())
    .pipe(gulp.dest(path.js));
});

/* Configuración de compilacion 'SASS'
-------------------------------------------------------------------------------*/
gulp.task('sass', function () {
 return gulp.src(path.sass)
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest(path.css));
});

/* Configuración de obsfucator 'JS'
-------------------------------------------------------------------------------*/
gulp.task('obsfucator', function() {
  gulp.src(path.src.js)
    .pipe(js_obfuscator({}, ['**/jquery-*.js']))
    .pipe(gulp.dest(path.build.js))
})

/* Optimización de imágenes
-------------------------------------------------------------------------------*/
gulp.task('images', function() {
  return gulp.src(path.images)
    .pipe(imagemin(path.options))
    .pipe(gulp.dest(path.imgmin))
});

/* Configuración de compilacion 'WATCH'
-------------------------------------------------------------------------------*/
gulp.task('watch', function () {
  gulp.watch(path.jade, jadeTasks);
  gulp.watch(path.coffee, coffeeTasks);
  gulp.watch(path.sass, stylusTasks);
  gulp.watch(path.src.js, obsfucatorTasks);
  gulp.watch(path.images, imagesTasks);
});

/* Start Webserver
-------------------------------------------------------------------------------*/
gulp.task('webserver', function() {
  connect.server();
});
gulp.task('default', ['webserver']);

