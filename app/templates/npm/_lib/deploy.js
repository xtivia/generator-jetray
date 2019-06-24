module.exports = function (gulp, liferay_config) {
  return function () {
	  
	  console.log('Deployment of Liferay JAR begins...');
	  
	  const path = require('path');
	 
	  var yo_options = require('../.yo-rc.json');
	  var jar_name = yo_options['generator-jetray'].portletName + '.jar';
	  var destination = path.join(yo_options['generator-jetray'].liferayHome,'deploy')
	  
	  return gulp.src(path.join(liferay_config.dist,jar_name))

		.pipe(gulp.dest(destination));
}}  