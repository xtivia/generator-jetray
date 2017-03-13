const buildsys = '<%=buildsys%>';
var config = require('./gulp-config')[buildsys];

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    sequence = require('gulp-sequence');

/*
 A very simple and trivial build task. The key here is to have build step(s)
 that produce(s) output into a directory that is used by the 'jar' and
 'deploy' tasks below to produce/deploy the relevant Liferay portlet artifact.
 In a 'real' application replace this with your own copy/transpile steps as
 needed.
*/
gulp.task('build',function() {
	return gulp.src(['index.html','*css/**/*','*js/**/*','*images/**/*'])
		.pipe(gulp.dest(config.build_dir));
});

gulp.task('clean', function () {
    return gulp.src([config.build_dir,config.dist_dir], {read: false})
        .pipe(clean({force:true}));
});

/*
 A configuration object to control operations of the Liferay-related gulp tasks (jar & deploy)
*/
var liferay_config = {
	inputs            : config.build_dir + '/**/*',  // glob spec for inputs to the Liferay JAR. globstring or [globstrings]
	dist              : config.dist_dir,             // directory to use as output target for JAR file
	auto_register_css : true,                        // whether or not to include liferay css/js tags
	auto_register_js  : true,
    //jsnames	        : ['js/foo.js','js/bar.js'],   //optional setting -- this lets you specifically
	                                                 // control which JS files are registered with Liferay
	                                                 // as well as the ordering. 
	gogo_port         : 11311                        // telnet port for Liferay gogo shell (used by deploy)
};

// configure the 'jar' and 'deploy' tasks based on npm/gradle environment
config.setupJarDeploy(gulp,liferay_config);

gulp.task('watch', function () {
  gulp.watch(['js/**/*.js','css/**/*.css','index.html']).on('change', function (e) {
    console.log('Resource file ' + e.path + ' has been changed. Updating...');
    sequence('build', 'deploy')(function (err) {
      if (err) console.log(err);
    });
  });
});