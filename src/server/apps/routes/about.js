const path = require( 'path' );
const fs = require( 'fs' );

const viewPath = path.join( __dirname, '..', '..', '..', 'views' );

const packageReader = require( '../../utils/package-reader' );
const version = packageReader.getVersion();

const navReader = require( '../../utils/nav-reader' );
const navitems = navReader.getNav();

const inlines = {
  css: fs.readFileSync( path.join( viewPath, 'inlines', 'about.core.css' ), 'utf-8' ),
  js: fs.readFileSync( path.join( viewPath, 'inlines', 'bootstrap.js' ), 'utf-8' ),
};

const preloads = [ {
  path: '/static/styles/about.later.css',
  type: 'style'
} ];

const cms = {
  about: require( '../cms/cms.about' ),
  footer: require( '../cms/cms.footer' )
}

const aboutOptions = {
  title: 'La nostra storia - Ortobon',
  version,
  navitems,
  inlines,
  preloads
};

// Set "Prodotti" to active
aboutOptions.navitems[ 2 ].active = true;

function aboutRoute( req, res ) {
  Promise.all( [
      cms.about.getData(),
      cms.footer.getData()
    ] )
    .then( cmsData => {
      let [ pageData, footerData ] = cmsData;

      aboutOptions.content = pageData;
      aboutOptions.footer = footerData;

      res.status( 200 ).render( 'about', aboutOptions );
    } );

}

module.exports = aboutRoute;
