const path = require('path');
const fs = require('fs');

var high = 9999; var low=1;
var randomSuffix = Math.floor(Math.random() * (high - low) + low);

function isValidLiferayDir(dirpath) {
   var pathToCheck = path.join(dirpath,'osgi','modules');
   if (fs.existsSync(pathToCheck)) {
	   return true;
   } else {
	   return false;
   }
}

module.exports = [
    {
        required: true,
        name: 'liferayHome',
        message: 'Liferay DXP Home Directory',
        default: '',
        validate : function(input) {
            if (!isValidLiferayDir(input)) {
                return input + " does not appear to be a valid DXP home directory. Please try again."
            } else return true;
        }
	},
	{
        required: true,
        name: 'portletName',
        message: 'Portlet ID',
        default: 'org.jetray.app'+ randomSuffix.toString(),
        validate : function(input) {
            if (input.indexOf(' ') != -1) {
                return "Spaces are not permitted in the ID."
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
        choices: ['Angular','React','Vue'],
        default: 'Angular'
    },
    {
        required: true,
        name: 'sassSupport',
        type: 'confirm',
        message: 'Include support for SASS (.scss)?',
        default: false,
        when: function (response) {
           return response.framework == 'Angular';
        }
    },
    {
        required: true,
        name: 'buildsys',
        type: 'list',
        message: 'Primary build system?',
        choices: ['npm/yarn','gradle'],
        default: 'npm/yarn'
    },
    {
        required: true,
        name: 'packageManager',
        type: 'list',
        message: 'Package Manager',
        default: 'npm',
        choices: ['npm','yarn'],
        when: function (response) {
           return response.buildsys == 'npm/yarn';
        }
    },
    {
        required: true,
        name: 'downloadNode',
        type: 'confirm',
        message: 'Use project private copy of Node.js?',
        default: false,
        when: function (response) {
           return response.buildsys == 'gradle';
        }
    }
];

