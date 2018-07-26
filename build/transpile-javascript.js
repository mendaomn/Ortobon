const rollup = require( 'rollup' );
const uglify = require( 'rollup-plugin-uglify' );
const babel = require( 'rollup-plugin-babel' );
const nodeResolve = require( 'rollup-plugin-node-resolve' );

const entries = [ {
  inPath: 'client/scripts/bootstrap.js',
  outPath: 'views/inlines/bootstrap.js'
}, {
  inPath: 'client/scripts/prodotti.js',
  outPath: 'client/scripts/prodotti.js'
}, {
  inPath: 'client/scripts/prodotto-singolo.js',
  outPath: 'client/scripts/prodotto-singolo.js'
}, {
  inPath: 'client/scripts/article.js',
  outPath: 'client/scripts/article.js'
} ];

let cache;
entries.forEach( entry => {
  rollup.rollup( {
    entry: `src/${entry.inPath}`,
    plugins: [
      babel(),
      nodeResolve( {
        jsnext: true,
        browser: true
      } ),
      uglify(),
    ],
    cache
  } ).then( bundle => {
    cache = bundle;
    bundle.write( {
      format: 'iife',
      dest: `dist/${entry.outPath}`
    } );
  } )
  .catch( err => {
    console.error(err);
  })
} );
