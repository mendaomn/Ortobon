const path = require( 'path' );
const fs = require( 'fs' );
const cloudinary = require('cloudinary');

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
  path: '/styles/prodotti.later.css',
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
    // '/scripts/buy-button-storefront.js',
    '/scripts/prodotti.js'
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
      let [ pageData, prodottiData, categories, footerData ] = cmsData;

      productsOptions.inlines.cms = `window.initialState={ products: ${JSON.stringify(prodottiData)}}`

      productsOptions.mastheadtitle = pageData.mastheadtitle;

      productsOptions.content = pageData
      productsOptions.products = prodottiData
        .sort( (a, b) => a.name > b.name ? 1 : -1 )
        .map( resizeImage );
      productsOptions.categories = categories;
      productsOptions.footer = footerData;

      res.status( 200 ).render( 'prodotti', productsOptions );
    } );

}

module.exports = productsRoute;

function resizeImage( item, i ) {
  const { public_id } = item.image
  const url = cloudinary.url(public_id, {
    secure: true,
    transformation: [
      { width: 320, crop: 'thumb', quality: 'auto', fetch_format: 'auto' }
    ]
  })

  item.image.secure_url = url
  return item
}