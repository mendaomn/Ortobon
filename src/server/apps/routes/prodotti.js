const path = require( 'path' );
const fs = require( 'fs' );

const viewPath = path.join( __dirname, '..', '..', '..', 'views' );

const ShopifyManager = require('../../utils/shopify-manager');
const packageReader = require( '../../utils/package-reader' );
const version = packageReader.getVersion();

const navReader = require( '../../utils/nav-reader' );
const navitems = navReader.getNav();

const inlines = {
  css: fs.readFileSync( path.join( viewPath, 'inlines', 'prodotti.core.css' ), 'utf-8' ),
  js: fs.readFileSync( path.join( viewPath, 'inlines', 'bootstrap.js' ), 'utf-8' ),
};

const preloads = [ {
  path: '/static/styles/prodotti.later.css',
  type: 'style'
} ];

const cms = {
  prodottipage: require( '../cms/cms.prodottipage' ),
  prodotti: require( '../cms/cms.prodotti' ),
  categorie: require('../cms/cms.categorie'),
  footer: require( '../cms/cms.footer' )
}

const productsOptions = {
  title: 'Tutti i prodotti - Ortobon',
  version,
  navitems,
  scripts: [
    ShopifyManager.SDK_URL,
    '/static/scripts/prodotti.js'
  ],
  inlines,
  preloads
};

// Set "Prodotti" to active
productsOptions.navitems[ 1 ].active = true;

function productsRoute( req, res ) {

  Promise.all( [
      cms.prodottipage.getData(),
      cms.prodotti.getData(),
      cms.categorie.getData(),
      cms.footer.getData()
    ] )
    .then( cmsData => {
      let [ prodottiData, pageData, categories, footerData ] = cmsData;

      productsOptions.inlines.cms = `window.initialState={ products: ${JSON.stringify(pageData)}}`

      pageData.mastheadtitle = prodottiData.mastheadtitle;

      productsOptions.content = pageData.sort( (a, b) => a.name > b.name ? 1 : -1 );
      productsOptions.categories = categories;
      productsOptions.footer = footerData;

      res.status( 200 ).render( 'prodotti', productsOptions );
    } );

}

module.exports = productsRoute;
