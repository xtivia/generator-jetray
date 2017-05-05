var Generator = require('yeoman-generator');
var yosay = require('yosay');
var prompts = require('./prompts');
var rename = require('gulp-rename');
var path = require('path');
var rimraf = require('rimraf');

module.exports = class extends Generator {
  
  initializing() {
		this.log(yosay('Welcome to the JetRay portlet generator for \nLiferay DXP!\nVersion 1.6.0'));
	}
  
  prompting() {

		var self = this;

		return this.prompt(prompts)
			.then((answers) => {
				self.props = answers;
				self.props.portletInstanceable = 'false';
				self.props.appFile = 'index.html';
				self.props.portletPath = self.props.portletName;
				self.props.portletNameCleaned = self.props.portletName.replace(/\./g,'_');
				self.config.set(self.props);
			});
	}

	writing() {
  
		this.fs.copy(this.templatePath('jetdb/*.*'),this.destinationPath('jetdb'));
    
		// for some reason the blu-generator mangles the copying of binary files
		// so if this is a gradle build we need to recopy any JARs from the main
		// app templates
		if (this.props.buildsys == 'gradle') {
      this.fs.copy(this.templatePath('buildlibs/deploy.jar'),this.destinationPath('buildlibs/deploy.jar'));
		}

    this.composeWith(require.resolve('../' + this.props.buildsys + '_common'),this.props);

    var self = this;

    // some wankiness since mem-fs move doesnt work very well. reassign base
		// src files from src/main/ui to base destination when targeting npm
    if (this.props.buildsys == 'npm') {
			this.registerTransformStream(rename(function (fpath) {
          // Windows?
			  	if (fpath.dirname.indexOf('src\\main\\ui') == 0) {
            fpath.dirname = fpath.dirname.replace('src\\main\\ui', '.');
					} else {
              // bash?
              if (fpath.dirname.indexOf('src/main/ui') == 0) {
                fpath.dirname = fpath.dirname.replace('src/main/ui', '.');
							}
					}
					return path;
			}));
	  }

	  this.composeWith(require.resolve('../' + this.props.framework),this.props);
	}

	install() {

		// related to janky code above--even if we rename the files the original
		// gradle style directories (src/main/ui/...) are still around so we need to 
    // clean up those (empty) gradle-esque directories
	  if (this.props.buildsys == 'npm') {
       rimraf('./src/main', function (err) { 
				 if (err) throw err; 
			 });
		}

		this.log("Initializing the project--this may take a few minutes...");
    if (this.props.buildsys == 'npm') {
	    this.npmInstall();
    } else {
      var done = this.async();
			this.spawnCommand('gradle',['npmInstall']).on('close', done);
    }
	}

}