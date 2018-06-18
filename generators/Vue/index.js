var blu = require( "blu-generator" );

module.exports = blu.extend( {
	writing: function() {
	  this.data = this.options;
	  this.writeTemplate();
	},
	install: function() {}
});