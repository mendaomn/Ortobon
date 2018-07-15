const path = require( 'path' );
const fs = require( 'fs' );

const viewPath = path.join( __dirname, '..', '..', '..', 'views' );

const packageReader = require( '../../utils/package-reader' );
const version = packageReader.getVersion();

const navReader = require( '../../utils/nav-reader' );
const navitems = navReader.getNav();

const inlines = {
  css: fs.readFileSync( path.join( viewPath, 'inlines', 'home.core.css' ), 'utf-8' ),
  js: fs.readFileSync( path.join( viewPath, 'inlines', 'bootstrap.js' ), 'utf-8' )
};

const preloads = [ {
  path: '/static/styles/home.later.css',
  type: 'style'
} ];

const cms = {
  home: require( '../cms/cms.home' ),
  articoli: require( '../cms/cms.articoli' ),
  footer: require( '../cms/cms.footer' )
};

const homeOptions = {
  title: `Ortobon - I prodotti che meriti dall'orto a casa tua`,
  version,
  navitems,
  inlines,
  preloads
};

// Set "Home" to active
homeOptions.navitems[ 0 ].active = true;

function homeRoute( req, res ) {
  Promise.all( [
      cms.home.getData(),
      cms.articoli.getLatest(),
      cms.footer.getData()
    ] )
    .then( cmsData => {
      let [ pageData, latestData, footerData ] = cmsData;

      homeOptions.content = pageData;
      homeOptions.content.latest = latestData;
      homeOptions.footer = footerData;

      res.status( 200 ).render( 'home', homeOptions );
    } );
}

module.exports = homeRoute;
