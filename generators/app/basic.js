module.exports = {

    addPrompts : function(prompts) {
      // nothing for now but here as a placeholder in case we need specific prompts for basic mode
    },

    generate : function(parent) {

        var savedRoot = parent.destinationRoot();

        if (parent.props.buildsys == 'gradle') {

            parent.fs.copy(parent.templatePath('basic/gradle/build.gradle'),
                parent.destinationPath('build.gradle'));
            parent.fs.copyTpl(parent.templatePath('basic/gradle/settings.gradle'),
                parent.destinationPath('settings.gradle'), parent.props);
            parent.fs.copy(parent.templatePath('basic/gradle/deploy.jar'),
                parent.destinationPath('buildlibs/deploy.jar'));
            parent.fs.copyTpl(parent.templatePath('basic/gradle/SimplePortlet.java'),
                parent.destinationPath('src/main/java/org/jetray/SimplePortlet.java'), parent.props);

            parent.fs.copy(parent.templatePath('shared/liferay/META-INF/resources/init.jsp'),
                parent.destinationPath('src/main/resources/META-INF/resources/init.jsp'));
            parent.fs.copy(parent.templatePath('shared/liferay/META-INF/resources/view.jsp'),
                parent.destinationPath('src/main/resources/META-INF/resources/view.jsp'));

            parent.destinationRoot('src/main/ui');
        }

        if (parent.props.framework == 'Basic') {

          parent.fs.copyTpl(parent.templatePath('basic/portlet/**/*'), parent.destinationPath(), parent.props);
            parent.fs.copy(parent.templatePath('basic/static/**/*'), parent.destinationPath());

          parent.fs.copyTpl(parent.templatePath('basic/package.json'),
                parent.destinationPath('package.json'),parent.props);
          parent.fs.copyTpl(parent.templatePath('basic/gulpfile.js'),
                parent.destinationPath('gulpfile.js'), parent.props);
          parent.fs.copyTpl(parent.templatePath('basic/gulp-config.js'),
                parent.destinationPath('gulp-config.js'), parent.props);

        }

        if (parent.props.buildsys == 'npm') {

            parent.fs.copy(parent.templatePath('shared/lib/*.*'),
                parent.destinationPath('.lib'));
            parent.fs.copy(parent.templatePath('shared/liferay/OSGI-INF/service_defn.xml'),
                parent.destinationPath('.liferay/OSGI-INF/service_defn.xml'));
            parent.fs.copy(parent.templatePath('shared/liferay/META-INF/MANIFEST.MF'),
                parent.destinationPath('.liferay/META-INF/MANIFEST.MF'));
            parent.fs.copy(parent.templatePath('shared/liferay/*content/**/*'),
                parent.destinationPath('.liferay'));
            parent.fs.copy(parent.templatePath('shared/liferay/META-INF/resources/*.jsp'),
                parent.destinationPath('.liferay/META-INF/resources'));
        }

        // ensure destination root is reset on the way out for subsequent frameworks to use
        parent.destinationRoot(savedRoot);
    }
};