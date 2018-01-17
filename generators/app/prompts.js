var high = 9999; var low=1;
var randomSuffix = Math.floor(Math.random() * (high - low) + low);

module.exports = [
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
        choices: ['Angular','React'],
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
        choices: ['npm','gradle'],
        default: 'npm'
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

