const buildsys = '<%=buildsys%>';
var config = require('./gulp-config')[buildsys];

var gulp = require('gulp'),
    path = require('path'),
    clean = require('gulp-clean'),
    replace = require('gulp-replace'),
    gulp_webpack = require('webpack-stream'),
    uglify = require('gulp-uglify'),
    webpack = require('webpack');
    
var webpack_config = require('./webpack.config');
var webpack_config_prod = require('./webpack.config.prod');

var buildNumber = new Date().toISOString().replace(/[^0-9]/g, '');

/*
 * Clean results of a previous build
 */
gulp.task('clean', function () {
    return gulp.src([config.build_dir,config.dist_dir], {read: false, allowEmpty:true})
        .pipe(clean({force: true}));
});

/*
 * Transpile ES6-based code into ES5 code bundle (dev)
 */
gulp.task('app_dev', function () {
     return gulp.src('src/App.js',{allowEmpty:true})
    .pipe(gulp_webpack(webpack_config,webpack))
    .pipe(gulp.dest(config.build_dir));
});

/*
 * Transpile ES6-based code into ES5 code bundle (prod)
 */
gulp.task('app_prod', function () {
     return gulp.src('src/App.js',{allowEmpty:true})
    .pipe(gulp_webpack(webpack_config_prod,webpack))
    .pipe(uglify())
    .pipe(gulp.dest(config.build_dir));
});

/*
 * Copy React runtime and portlet loader.
 */
gulp.task("install-react-runtime",function() {
   return gulp.src(['react_runtime/*.js'])
    .pipe(replace('$$buildNumber$$', buildNumber))
    .pipe(gulp.dest(config.build_dir));
});

/*
 * Copy main html into build directory.
 */
gulp.task("resources", function () {
    return gulp.src(['src/index.html'])
        .pipe(gulp.dest(config.build_dir));
});

/*
  Development build
*/
gulp.task('build', gulp.series('clean',gulp.series('install-react-runtime','resources','app_dev')), function (err) {
    if (err) console.log(err);
  }
); 

/*
  Production build
*/
gulp.task('prod', gulp.series('clean',gulp.series('install-react-runtime','resources','app_prod')), function (err) {
    if (err) console.log(err);
  }
); 

/*
 A configuration object to control operations of the Liferay-related gulp tasks (jar & deploy)
 */
var liferay_config = {
    inputs            : config.build_dir + '/**/*',  // glob spec for inputs to the Liferay JAR. globstring or [globstrings]
    dist              : config.dist_dir,          // directory to use as output target for JAR file
    auto_register_css : true,            // whether or not to include liferay css/js tags
    auto_register_js  : true,
    jsnames           : ['/portlet_loader.js?buildNumber=' + buildNumber],
    gogo_port         : 11311            // telnet port for Liferay gogo shell (used by deploy)
};

// Liferay JAR creation and deployment tasks
// configure the 'jar' and 'deploy' tasks based on npm/gradle environment
config.setupJarDeploy(gulp,liferay_config);

function showWebpackSummary(stats) {
  console.log('[webpack-watch]\n' + stats.toString({
      colors: true,
      hash: false,
      timings: false,
      chunks: true,
      chunkModules: false,
      modules: false,
      children: false,
      version: true,
      cached: false,
      cachedAssets: false,
      reasons: false,
      source: false,
      errorDetails: true
  }));
}  
  
gulp.task('watch', (cb) => {
  
  gulp.watch([config.build_dir + "/app.js"]).on('change', function (e) {
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
