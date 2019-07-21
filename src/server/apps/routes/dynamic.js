const express = require( 'express' );
const dynamic = express();
const path = require( 'path' );
const adaro = require( 'adaro' );
const fs = require( 'fs' );

const HashHelper = require('../../utils/hash')

const viewPath = path.join( __dirname, '..', '..', '..', 'views' );

const pluginsPath = path.join( __dirname, '..', '..', 'utils' );

const dustOptions = {
  helpers: [
    'dustjs-helpers',
    HashHelper.init
  ]
}

dynamic.engine( 'dust', adaro.dust(dustOptions) );
dynamic.set( 'view engine', 'dust' );
dynamic.set( 'views', viewPath );

// Provide tinymce plugins
dynamic.use( '/plugins', express.static( pluginsPath ) );

// Middlewares
dynamic.use( (req, res, next) => {
  res.locals.path = req.path
  next()
} )

// Routes
dynamic.get( '/', require( './home.js' ) );
dynamic.get( '/prodotti', require( './prodotti.js' ) );
dynamic.get( '/prodotti/:slug', require( './prodotto-singolo.js' ) );
dynamic.get( '/blog', require( './blog.js' ) );
dynamic.get( '/blog/:id', require( './articolo.js' ) );
dynamic.get( '/about', require( './about.js' ) );
dynamic.post( '/newcomment', require( './newcomment.js' ) );
dynamic.post( '/deletecomment', require( './deletecomment.js' ) );

dynamic.get( '/sitemap.xml/?', require('./sitemap.js' ) );
dynamic.get( '/robots.txt/?', require('./robots-txt.js' ) );

console.log( '[App: Dynamic] initialized.' );

module.exports = dynamic;
