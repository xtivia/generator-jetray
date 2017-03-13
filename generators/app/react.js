module.exports = {

    addPrompts : function(prompts) {
       // nothing for now but here as a placeholder in case we need specific prompts for React
    },

    generate : function(parent) {

      var currentRoot = parent.destinationRoot()

      if (parent.props.buildsys == 'gradle') {

          parent.fs.copy(parent.templatePath('react/gradle/build.gradle'),
              parent.destinationPath('build.gradle'));
          parent.fs.copyTpl(parent.templatePath('react/gradle/SimplePortlet.java'),
              parent.destinationPath('src/main/java/org/jetray/SimplePortlet.java'), parent.props);

          parent.destinationRoot('src/main/ui');
      }

      parent.fs.copyTpl(parent.templatePath('react/*.json'),
          parent.destinationPath(""),parent.props);
      parent.fs.copyTpl(parent.templatePath('react/rollup*.js'),
          parent.destinationPath(""),parent.props);
      parent.fs.copyTpl(parent.templatePath('react/gulpfile.js'),
          parent.destinationPath('gulpfile.js'), parent.props);
      parent.fs.copyTpl(parent.templatePath('react/gulp-config.js'),
          parent.destinationPath('gulp-config.js'), parent.props);
      parent.fs.copyTpl(parent.templatePath('react/config/config.js'),
          parent.destinationPath("config/config.js"),parent.props);
      parent.fs.copy(parent.templatePath('react/src/*.js'),
          parent.destinationPath("src"));

      parent.fs.copyTpl(parent.templatePath('react/src/index.html'),
          parent.destinationPath("src/index.html"),parent.props);

      if (parent.props.buildsys == 'npm') {
         parent.fs.copy(parent.templatePath('react/liferay/META-INF/MANIFEST.MF'),
            parent.destinationPath('.liferay/META-INF/MANIFEST.MF'));
      }

      // ensure destination root is reset on the way out for subsequent frameworks to use
      parent.destinationRoot(currentRoot);
    }
};