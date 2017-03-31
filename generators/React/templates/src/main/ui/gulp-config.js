const GRADLE_ROOT = '../../..';

exec = require('child_process').exec;

module.exports = {
  npm : {
    build_dir:  'build',
    dist_dir:   'dist',
    setupJarDeploy : function(gulp,liferay_config) {
      gulp.task('jar', require('./_lib/jar')(gulp,liferay_config));
      gulp.task('deploy', ['jar'],require('./_lib/deploy')(gulp,liferay_config));
    }
  },
  gradle : {
    build_dir:  GRADLE_ROOT + '/build' + '/ui_build',
    dist_dir:   GRADLE_ROOT + '/build' + '/ui_build',
    setupJarDeploy : function(gulp,liferay_config) {
      gulp.task('jar', function (cb) {
        exec('gradle jar -x compileJava', { cwd: GRADLE_ROOT}, function (err, stdout, stderr) {
          console.log(stdout);
          console.log(stderr);
          cb(err);
        });
      });						   
      gulp.task('deploy', function (cb) {
        exec('gradle jar deploy -x compileJava', { cwd: GRADLE_ROOT}, function (err, stdout, stderr) {
          console.log(stdout);
          console.log(stderr);
          cb(err);
        });
      });       
    }
  }  
}