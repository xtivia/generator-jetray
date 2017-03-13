const buildsys = '<%=buildsys%>';
var config = require('./gulp-config')[buildsys];

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    babel = require('gulp-babel'),
    sequence = require('gulp-sequence'),
    sourcemaps = require('gulp-sourcemaps'),
    rollup = require('gulp-better-rollup'),
    rollup_options = require('./rollup_options');

/*
 * Clean results of a previous build
 */
gulp.task('clean', function () {
    return gulp.src([config.rollup_dir,config.build_dir,config.dist_dir], {read: false})
        .pipe(clean({force: true}));
});

/*
 * Bundle (rollup) ES6-based JSX/JS files and their dependencies
 */
gulp.task('rollup', function() {
    return gulp.src('src/App.js')
        .pipe(rollup(rollup_options,rollup_options))
        .pipe(gulp.dest(config.rollup_dir))
});

/*
 * Transpile ES6-based bundled file into ES5 code
 */
gulp.task('compile', ['rollup'], function () {
    return gulp.src([config.rollup_dir+'/App.js'])
        .pipe(babel({
            "presets": ["es2015","react"],
            "plugins": ["transform-es2015-modules-amd"]
         }))
        .pipe(gulp.dest(config.build_dir));
});

/*
 * Copy all required libraries into build directory.
 */
gulp.task("libs", function () {
    return gulp.src([
        './react/dist/react.js',
        './react-dom/dist/react-dom.js'
    ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest(config.build_dir + "/lib"));
});

/*
 * Copy AMD Loader configuration and main html into build directory.
 */
gulp.task("copymain", function () {
    return gulp.src(['config/config.js','src/index.html'])
        .pipe(gulp.dest(config.build_dir));
});

gulp.task('build', ['compile','libs','copymain']);

/*
 A configuration object to control operations of the Liferay-related gulp tasks (jar & deploy)
 */
var liferay_config = {
    inputs            : config.build_dir + '/**/*',  // glob spec for inputs to the Liferay JAR. globstring or [globstrings]
    dist              : config.dist_dir,          // directory to use as output target for JAR file
    auto_register_css : true,            // whether or not to include liferay css/js tags
    auto_register_js  : false,
    gogo_port         : 11311            // telnet port for Liferay gogo shell (used by deploy)
};

// Liferay JAR creation and deployment tasks
// configure the 'jar' and 'deploy' tasks based on npm/gradle environment
config.setupJarDeploy(gulp,liferay_config);

/**
 * Watch for changes in JS, HTML and CSS files.
 */
gulp.task('watch', function () {
    gulp.watch(["./src/*.js"]).on('change', function (e) {
        console.log('JS file ' + e.path + ' has been changed. Compiling...');
        sequence('compile', 'deploy')(function (err) {
            if (err) console.log(err);
        });
    });
    gulp.watch(['config/config.js','src/index.html']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating...');
        sequence('copymain', 'deploy')(function (err) {
            if (err) console.log(err);
        });
    });
});