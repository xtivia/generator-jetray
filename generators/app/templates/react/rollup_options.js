var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var jsx = require('rollup-plugin-jsx');
var replace = require('rollup-plugin-replace');

module.exports = {
	format: 'es',
	sourceMap: false,
	plugins: [
      jsx({factory: 'React.createElement', 
           passUnknownTagsToFactory : true,
           arrayChildren: false }),
	    resolve({jsnext: true,
               main: true, 
               browser: true,
               extensions: ['.js','.jsx']}),
      commonjs({include: 'node_modules/**'}),
      replace({
         'process.env.NODE_ENV': JSON.stringify( 'production' )
      })
	],
	external: [
	  'react',
	  'react-dom'
	],
	globals: {
	  'react'     : 'React',
	  'react-dom' : 'ReactDOM'
	},
  onwarn: function( warning ) {
    if ( warning.code === 'UNUSED_EXTERNAL_IMPORT' ) return;
    if ( warning.code === 'NON_EXISTENT_EXPORT' ) {
      throw new Error( warning.message );
    }
    console.warn( warning.message );
  }
};