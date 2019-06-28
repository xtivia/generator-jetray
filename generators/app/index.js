let Generator = require('yeoman-generator');
let SimpleGenerator = require('./simple_generator')
let yosay = require('yosay');
let prompts = require('./prompts');

module.exports = class extends Generator {
  
    initializing() {
		this.simpleGenerator = new SimpleGenerator()
		this.log(yosay('Welcome to the JetRay portlet generator for \nLiferay DXP!\nVersion 2.2.0'));
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
		this.simpleGenerator.generate(this.templatePath(''), this.destinationPath(''), this.props)
	}

	install() {
		this.log("Initializing the project--this may take a few minutes...");
		if (this.props.buildsys === 'npm/yarn') {
			if (this.props.packageManager === 'npm') {
				this.npmInstall([], { 'no-optional': true, "loglevel": "error" });
			} else {
				this.yarnInstall([], { 'ignore-optional': true });
			}
		} else {
			var done = this.async();
			this.spawnCommand('gradle', ['npmInstall']).on('close', done);
		}
	}

}