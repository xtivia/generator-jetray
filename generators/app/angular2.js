module.exports = {

    addPrompts : function(prompts) {
       var appTypePrompt = {
 	       required: true,
		     name: 'ngappstyle',
		     type: 'list',
		     message: 'Angular App Style?',
         choices: ['SystemJS','AOT'],
		     default: 'SystemJS',
         when: function (response) {
             return response.framework == 'Angular2';
         }
       };
       prompts.push(appTypePrompt);
    },

    generate : function(parent) {

      // since we have to generate for two different app models (SystemJS, AOT) and two different build
      // frameworks (npm and gradle) we use a table driven approach for the generator.
      //
      // 't' vs 'f' indicates whether its a file- or template- based copy
      // 'aot' vs 'sysjs' indicates to which application pattern the file applies
      // 'npm' vs 'gradle' indicates to which build tool the file applies
      //  the first file location is the source of the copy operation
      //  the second file location is the target for the file in the generated output
      //
      var gen_config = [
        ['f','aot','gradle','aot/app/**/*','ui/src/app'],
        ['f','aot','npm','aot/app/**/*','src/app'],
        ['f','aot','gradle','aot/gulp-config.js','ui/gulp-config.js'],
        ['f','aot','npm','aot/gulp-config.js','gulp-config.js'],
        ['t','aot','gradle','aot/gulpfile.js','ui/gulpfile.js'],
        ['t','aot','npm','aot/gulpfile.js','gulpfile.js'],
        ['t','aot','gradle','aot/package.json','ui/package.json'],
        ['t','aot','npm','aot/package.json','package.json'],
        ['f','aot','gradle','aot/rollup_options.js','ui/rollup_options.js'],
        ['f','aot','npm','aot/rollup_options.js','rollup_options.js'],
        ['f','aot','gradle','aot/typings.json','ui/typings.json'],
        ['f','aot','npm','aot/typings.json','typings.json'],
        ['f','aot','gradle','aot/tsconfig-aot.json','ui/tsconfig.json'],
        ['f','aot','npm','aot/tsconfig-aot.json','tsconfig.json'],
        ['f','aot','gradle','aot/view.jsp','resources/META-INF/resources/view.jsp'],
        ['f','aot','npm','aot/view.jsp','.liferay/META-INF/resources/view.jsp'],
        ['f','aot','gradle','aot/index.html','ui/src/index.html'],
        ['f','aot','npm','aot/index.html','src/index.html'],

        ['f','sysjs','gradle','systemjs/app/**/*','ui/src/app'],
        ['f','sysjs','npm','systemjs/app/**/*','src/app'],
        ['f','sysjs','gradle','systemjs/gulp-config.js','ui/gulp-config.js'],
        ['f','sysjs','npm','systemjs/gulp-config.js','gulp-config.js'],
        ['t','sysjs','gradle','systemjs/gulpfile.js','ui/gulpfile.js'],
        ['t','sysjs','npm','systemjs/gulpfile.js','gulpfile.js'],
        ['t','sysjs','gradle','systemjs/package.json','ui/package.json'],
        ['t','sysjs','npm','systemjs/package.json','package.json'],
        ['f','sysjs','gradle','systemjs/systemjs.config.ejs','ui/src/systemjs.config.js'],
        ['f','sysjs','npm','systemjs/systemjs.config.ejs','src/systemjs.config.js'],
        ['f','sysjs','gradle','systemjs/tsconfig.json','ui/tsconfig.json'],
        ['f','sysjs','npm','systemjs/tsconfig.json','tsconfig.json'],
        ['f','sysjs','gradle','systemjs/typings.json','ui/typings.json'],
        ['f','sysjs','npm','systemjs/typings.json','typings.json'],
        ['f','sysjs','gradle','systemjs/view.jsp','resources/META-INF/resources/view.jsp'],
        ['f','sysjs','npm','systemjs/view.jsp','.liferay/META-INF/resources/view.jsp'],
        ['f','sysjs','gradle','systemjs/index.html','ui/src/index.html'],
        ['f','sysjs','npm','systemjs/index.html','src/index.html'],

        ['f','aot','gradle','gradle/build.gradle','../../build.gradle'],
        ['f','sysjs','gradle','gradle/build.gradle','../../build.gradle'],
        ['t','aot','gradle','aot/SimplePortlet.java','java/org/jetray/SimplePortlet.java'],
        ['t','sysjs','gradle','systemjs/SimplePortlet.java','java/org/jetray/SimplePortlet.java'],

        ['f','aot','npm','aot/org.jetray.angular.runtime.jar', 'angular_runtime/org.jetray.angular.runtime.jar'],
        ['f','aot','gradle','aot/org.jetray.angular.runtime.jar','../../angular_runtime/org.jetray.angular.runtime.jar']
      ];

      var savedDestRoot = parent.destinationRoot();
      var ngtype = (parent.props.ngappstyle == 'AOT' ? 'aot' : 'sysjs');

      if (parent.props.buildsys == 'gradle') {
        parent.destinationRoot('src/main');
      }

      gen_config.forEach(function(cfg) {
        if (cfg[1] == ngtype && cfg[2] == parent.props.buildsys) {
          if (cfg[0] == 't') {
            parent.fs.copyTpl(parent.templatePath('angular2/' + cfg[3]),
                parent.destinationPath(cfg[4]), parent.props);
          } else {
            parent.fs.copy(parent.templatePath('angular2/' + cfg[3]),
                parent.destinationPath(cfg[4]));
          }
        }
      });

      // ensure destination root is reset on the way out for subsequent frameworks to use
      parent.destinationRoot(savedDestRoot);
    }
};