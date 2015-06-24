var gulp    = require('gulp');
var notify  = require('gulp-notify');
var coffee  = require('gulp-coffee');
var elixir  = require('laravel-elixir');

var config  = elixir.config;
var plugins = require('gulp-load-plugins')();

var utilities = require('laravel-elixir/ingredients/commands/Utilities');
var Notification = require('laravel-elixir/ingredients/commands/Notification');


/*
 |----------------------------------------------------------------
 | CoffeeScript Compilation
 |----------------------------------------------------------------
 |
 | This task will compile your CoffeeScript, minify it, and then
 | optionally generate a "manifest" file that helps with your
 | browser cache-busting of previous versions of your code.
 |
 */

elixir.extend('coffeedir', function(src, output) {

  var config  = this;
  var baseDir = config.assetsDir + 'coffee/';
  var search  = '**/*.coffee';

  var onError = function(e) {
    new Notification().error(e, 'CoffeeScript Compilation Failed!');

    this.emit('end');
  };

  src = utilities.buildGulpSrc(src, assetsDir, search);

  gulp.task('coffeedir', function() {

    return gulp.src(src)
      .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.init()))
      .pipe(plugins.coffee(options).on('error', onError))
      .pipe(plugins.if(config.production, plugins.uglify()))
      .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.write('.')))
      .pipe(gulp.dest(output || config.jsOutput))
      .pipe(new Notification().message('CoffeeScript Compiled!'));

  });

  this.registerWatcher('coffeedir', baseDir + search);

  return this.queueTask('coffeedir');

});