const buildsys = '<%=buildsys%>';
var config = require('./gulp-config')[buildsys];

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    sequence = require('gulp-sequence'),
    ngc = require('gulp-ngc'),
    rollup = require('gulp-better-rollup'),
    rollup_options = require('./rollup_options');

/**
 * Clean working directories
 */
gulp.task('clean', function () {
    return gulp.src([config.build_dir,
                     config.dist_dir,
                     config.ngc_dir,
                     config.aot_dir], {read: false})
        .pipe(clean({force:true}));
});

/**
 * compile TypeScript sources using Angular compiler.
 */
gulp.task('ngc', function() {
    return ngc('tsconfig.json');
});

gulp.task('bundle', ['ngc'], function() {
  return gulp.src('ngcout/src/app/main.js')
    .pipe(rollup(rollup_options,rollup_options))
    .pipe(gulp.dest(config.build_dir))
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", function() {
    return gulp.src(["src/**/*", "!**/*.ts"])
        .pipe(gulp.dest(config.build_dir));
});

/**
 * Build the project.
 */
gulp.task("build", ['bundle', 'resources'], function () {
    //console.log("Building the project ...");
});

/*
 A configuration object to control operations of the Liferay-related gulp tasks (jar & deploy)
*/
var liferay_config = {
	inputs            : [ config.build_dir + '/main.js', 'src/index.html' ],
	dist              : config.dist_dir,
	auto_register_css : false,
	auto_register_js  : true,
	gogo_port         : 11311
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
				sequence('bundle','deploy')(function (err) {
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