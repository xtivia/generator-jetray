const buildsys = '<%=buildsys%>';
var config = require('./gulp-config')[buildsys];

var gulp = require('gulp');
var clean = require('gulp-clean');
var sequence = require('gulp-sequence');
var tsc = require("gulp-typescript");
var tsProject = tsc.createProject("tsconfig.json");

/**
 * Clean build and dist directories
 */
gulp.task('clean', function () {
    return gulp.src([config.build_dir,config.dist_dir], {read: false})
        .pipe(clean({force:true}));
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", function() {
	var tsResult;
    tsResult = gulp.src("src/**/*.ts")
        .pipe(tsProject());
    return tsResult.js
        .pipe(gulp.dest(config.build_dir));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", function() {
    return gulp.src(["src/**/*", "!**/*.ts"])
        .pipe(gulp.dest(config.build_dir));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", function () {
    return gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**/*.js',
            'zone.js/dist/zone.js',
            '@angular/**/bundles/**'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest(config.build_dir + "/lib"));
});

/**
 * Build the project.
 */
gulp.task("build", ['compile', 'resources', 'libs'], function () {
    //console.log("Building the project ...");
});

/*
 A configuration object to control operations of the Liferay-related gulp tasks (jar & deploy)
*/
var liferay_config = {
	inputs            : config.build_dir + '/**/*',   // glob spec for inputs to the Liferay JAR. globstring or [globstrings]
	dist              : config.dist_dir,         // directory to use as output target for JAR file
	auto_register_css : false,          // whether or not to include liferay css/js tags
	auto_register_js  : false,
	gogo_port         : 11311           // telnet port for Liferay gogo shell (used by deploy)
};

// Liferay JAR creation and deployment tasks
// configure the 'jar' and 'deploy' tasks based on npm/gradle environment
config.setupJarDeploy(gulp,liferay_config);

/**
* Watch for changes in TypeScript, HTML and CSS files.
*/
gulp.task('watch', function () {
  gulp.watch(["src/**/*.ts"]).on('change', function (e) {
      console.log('TypeScript file ' + e.path + ' has been changed. Compiling...');
      sequence('compile', 'deploy')(function (err) {
         if (err) console.log(err);
      });
  });
  gulp.watch(["src/**/*.html", "src/**/*.css"]).on('change', function (e) {
      console.log('Resource file ' + e.path + ' has been changed. Updating...');
      sequence('resources', 'deploy')(function (err) {
         if (err) console.log(err);
      });
  });
});