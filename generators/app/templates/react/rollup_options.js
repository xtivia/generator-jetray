var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var jsx = require('rollup-plugin-jsx');

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
      commonjs({include: 'node_modules/**'})          
	],
	external: [
	  'react',
	  'react-dom'
	],
	globals: {
	  'react'     : 'React',
	  'react-dom' : 'ReactDOM'
	}
}