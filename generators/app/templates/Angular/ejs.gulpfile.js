const buildsys = '<%=buildsys%>';
var config = require('./gulp-config')[buildsys];

var gulp = require('gulp'),
    path = require('path'),
    webpack = require('webpack'),
    gulp_webpack = require('webpack-stream'),
    clean = require('gulp-clean'),
    replace = require('gulp-replace'),
    uglify = require('gulp-uglify'),
    named = require('vinyl-named');
    
var webpack_config = require('./webpack.config'),
    webpack_config_aot = require('./webpack.config.aot');

var buildNumber = new Date().toISOString().replace(/[^0-9]/g, '');
    
/*
 * Clean working directories
 */
gulp.task('clean', function () {
    return gulp.src([config.build_dir,
                     config.dist_dir,
                     config.ngc_dir,
                     config.aot_dir], {read: false, allowEmpty:true})
        .pipe(clean({force:true}));
});

/*
 * Copy main html into build directory.
 */
gulp.task("resources", function () {
    return gulp.src(['src/index.html'],{allowEmpty:true})
        .pipe(gulp.dest(config.build_dir));
});

/*
  Minification
*/
gulp.task("uglify", function () {
    return gulp.src([config.build_dir + '/main.js'],{allowEmpty:true})
      .pipe(uglify())
      .pipe(gulp.dest(config.build_dir));
});

/*
*  Install global scripts needed by Angular
*/
gulp.task('globals', function () {
    return gulp.src(['globals/*.js'],{allowEmpty:true})
      .pipe(gulp.dest(config.build_dir))
});

/*
 * Copy Angular runtime and portlet loader.
 */
gulp.task("install-ng-runtime",function() {
   return gulp.src(['ng_runtime/*.js'],{allowEmpty:true})
      .pipe(replace('$$buildNumber$$', buildNumber))
      .pipe(gulp.dest(config.build_dir));
});

/*
 * Build the application for development-mode
 */
gulp.task('app', function () {
    return gulp.src(['./src/main.ts'],{allowEmpty:true})
    // see docs for webpack-stream; allows us to use the webpack bundle name(s)
    .pipe(named())
    .pipe(gulp_webpack(webpack_config,webpack))
    .pipe(gulp.dest(config.build_dir));
}); 

/*
 * Build the application for production-mode
 */ 
gulp.task('app_aot', function () {
    return gulp.src(['./src/main_aot.ts'],{allowEmpty:true}) //,'./src/vendor_aot.ts'])
    // see docs for webpack-stream; allows us to use the webpack bundle name(s)
    .pipe(named())
    .pipe(gulp_webpack(webpack_config_aot,webpack))
    .pipe(gulp.dest(config.build_dir));
});  
 
/*
  Development build
*/ 
gulp.task('build', gulp.series('clean',gulp.series('resources','install-ng-runtime','globals','app')), function (err) {
  if (err) console.log(err);
}); 

/*
  Production build
*/
gulp.task('prod', gulp.series('clean',gulp.series('resources','install-ng-runtime','globals','app_aot'),'uglify'), function (err) {
  if (err) console.log(err);
}); 

/*
 A configuration object to control operations of the Liferay-related gulp tasks (jar & deploy)
*/
var liferay_config = {
	inputs            : [ config.build_dir + '/**/*' ],
	dist              : config.dist_dir,
	auto_register_css : false,
	auto_register_js  : true,
  jsnames           : ['/portlet_loader.js?buildNumber=' + buildNumber],
	gogo_port         : 11311
};

/*
  Liferay JAR creation and deployment tasks
  configure the 'jar' and 'deploy' tasks based on npm/gradle environment
*/
config.setupJarDeploy(gulp,liferay_config);

/*
 * Use webpack to watch for changes in application files.
 * then rebuild contents into the DXP JAR & re-deploy.
 */
    
function showWebpackSummary(stats) {
  console.log('[webpack-watch]\n' + stats.toString({
      colors: true,
      hash: true,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      children: true,
      version: true,
      cached: false,
      cachedAssets: false,
      reasons: false,
      source: false,
      errorDetails: true
  }));
}  
  
gulp.task('watch', (cb) => {
  
  gulp.watch([config.build_dir + "/main.js"]).on('change', function (e) {
    console.log('Application has been updated. Re-deploying...');
    gulp.series('deploy', function (err) {
      if (err) console.log(err);
    });
  });
  
  const webpackconfig = Object.create(require('./webpack.config.js'));
  webpackconfig.watch = true;
  webpackconfig.cache = true;
  webpackconfig.bail = false;
  webpackconfig.output.path = path.resolve(config.build_dir);
  
  webpack(webpackconfig, function(error, stats) {
    if (error) {
      console.log('[webpack]' + error.toString());
    }
    showWebpackSummary(stats);
  });
});
