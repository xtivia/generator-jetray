'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var fs = require('fs-extra');
var path = require('path');
var rename = require('gulp-rename');
var exec = require('child_process').exec;

//---- utilities for generating basic apps ----//
var basic = require('./basic');

//---- utilities for generating Angular2 apps ----//
var angular2 = require('./angular2');

//---- utilities for generating React apps ----//
var react = require('./react');

//-------- Base Generator----------//
module.exports = yeoman.generators.Base.extend({
	
  prompting: function () {
	  
    var done = this.async();
		
		this.log(yosay('Welcome to the Jetray portlet generator for \nLiferay DXP!'));
    
		var self = this;
		
		// generate a random number to append to portlet name
		// this (probably) keeps those who are just blindly hitting enter
		// from overwriting previous efforts

		var high = 9999; var low=1;
		var randomSuffix = Math.floor(Math.random() * (high - low) + low);
		
		var prompts = [
			  {
				  required: true,
				  name: 'portletName',
				  message: 'Portlet Name (identifier)',
				  default: 'org.jetray.app'+ randomSuffix.toString(),
				  validate : function(input) {
					  if (input.indexOf(' ') != -1) {
						  return "Spaces are not permitted in the name."
					  } else return true;
				  }
			  },			  
			  {
				  required: true,
				  name: 'portletTitle',
				  message: 'Portlet Title',
				  default: 'Sample Jetray Portlet'
			  },	  
			  {
				  required: true,
				  name: 'portletCategory',
				  message: 'Portlet Category',
				  default: 'Sample Jetray Portlets'
			  },
        {
				  required: true,
				  name: 'framework',
				  type: 'list',
				  message: 'JS Framework?',
          choices: ['Basic','Angular2','React'],
				  default: 'Basic'
			  },
        {
				  required: true,
				  name: 'buildsys',
				  type: 'list',
				  message: 'Primary build system?',
          choices: ['npm','gradle'],
				  default: 'npm'
			  }
		];

		// --- set up Angular2 prompts ----
		angular2.addPrompts(prompts);
		
		this.prompt(prompts, function (props) {
		  this.props = props;
	      done();
		}.bind(this));
  },

  writing: {
	  
    app: function () {

      // set overwrite mode so that framework-specific logic can overwrite base files
      this.conflicter.force = true;
				  	  	  
      this.props.portletInstanceable = 'false';
      this.props.appFile = 'index.html';
      this.props.portletPath = this.props.portletName;
      this.props.portletNameCleaned = this.props.portletName.replace(/\./g,'_');
      this.config.set(this.props);

      this.registerTransformStream(rename(function(path) {
        if (path.extname == ".ejs") path.extname = '.js';
      }));

      //------ JSON DB stuff -------------------------------------
      this.fs.copy(this.templatePath('jetdb/**/*'), this.destinationPath('jetdb'));

      // -------- Setup the basic implementation; parts can be overridden by other frameworks-------
      basic.generate(this);

      // -------- Angular 2 stuff ----------------------------------------------
      if (this.props.framework == 'Angular2') {
        angular2.generate(this);
      } 
      
	  // -------- React stuff ----------------------------------------------
      if (this.props.framework == 'React') {
          react.generate(this);
      }
    }
  },

  install: function () {
    this.log("Initializing the project--this may take a few minutes...");
    if (this.props.buildsys == 'npm') {
	    this.npmInstall();
    } else {
      var done = this.async();
      this.spawnCommand('gradle',['nodeSetup','npmInstall']).on('close', done);
    }
  }
  
});