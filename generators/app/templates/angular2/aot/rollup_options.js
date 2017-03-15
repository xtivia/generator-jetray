var rollup=require('rollup');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');

module.exports = {
  sourceMap: false,
  format: 'iife',
  onwarn: function(warning) {
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }
    if ( warning.indexOf("The 'this' keyword is equivalent to 'undefined'") > -1 ) { return; }
    console.warn( warning.message );
  },
  plugins: [
      nodeResolve({jsnext: true, module: true}),
      commonjs({
        include: 'node_modules/rxjs/**'
      })
  ]
};
