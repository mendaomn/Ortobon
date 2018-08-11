const path = require( 'path' );
const fs = require( 'fs' );
const { JSDOM } = require('jsdom');
const cloudinary = require('cloudinary');

const viewPath = path.join( __dirname, '..', '..', '..', 'views' );

const ShopifyManager = require('../../utils/shopify-manager');
const packageReader = require( '../../utils/package-reader' );
const version = packageReader.getVersion();

const navReader = require( '../../utils/nav-reader' );
const navitems = navReader.getNav();

const inlines = {
  css: fs.readFileSync( path.join( viewPath, 'inlines', 'prodotto.core.css' ), 'utf-8' ),
  js: fs.readFileSync( path.join( viewPath, 'inlines', 'bootstrap.js' ), 'utf-8' ),
};

const preloads = [ {
  path: '/styles/prodotto.later.css',
  type: 'style'
} ];

const cms = {
  articoli: require( '../cms/cms.articoli' ),
  prodotti: require( '../cms/cms.prodotti' ),
  footer: require( '../cms/cms.footer' )
}

const productsOptions = {
  title: 'Ortobon',
  version,
  navitems,
  inlines,
  preloads,
  scripts: [
    ShopifyManager.SDK_URL,
    '/scripts/prodotto-singolo.js'
  ],
};

// Set "Prodotti" to active
productsOptions.navitems[ 1 ].active = true;

function singleProductRoute( req, res ) {
  const product_id = req.params.id;

  Promise.all( [
      cms.prodotti.getDataById( product_id ),
      cms.footer.getData()
    ] )
    .then( cmsData => {
      let [ pageData, footerData ] = cmsData;

      pageData = pageData.toJSON();
      pageData.recipes = pageData.recipes
        .map( cms.articoli._expandTagsInPost )
        .map( cms.articoli._truncateContent );

      pageData.hasNutritions = pageData.cals || pageData.fats || pageData.ports || pageData.carbs || pageData.fibers
      pageData.hasRecipes = pageData.recipes.length > 0

      const inferredMetaDescription = getMetaFromDescription(pageData.description)

      pageData.meta_description = pageData.meta_description || inferredMetaDescription

      pageData.image = resizeImage( pageData.image )

      productsOptions.title = `${pageData.name} - Negozio Ortobon`;
      productsOptions.content = pageData;
      productsOptions.footer = footerData;

      res.status( 200 ).render( 'prodotto-singolo', productsOptions );
    } );

}

function getMetaFromDescription(description) {
  if (!description) return

  const dom = new JSDOM(`<!DOCTYPE html>${description}`)
  const {textContent} = dom.window.document.querySelector("html")

  const shortDescription = textContent.substr(0, 160)
  const lastSentenceIndex = shortDescription.lastIndexOf('.')
  
  return lastSentenceIndex !== -1 ? 
          shortDescription.substr(0, lastSentenceIndex) :
          shortDescription
}

module.exports = singleProductRoute;

function resizeImage( image ) {
  const { public_id } = image
  const url = cloudinary.url(public_id, {
    secure: true,
    transformation: [
      { width: 1920, crop: 'fill', quality: 'auto', fetch_format: 'auto' }
    ]
  })

  image.secure_url = url
  return image
}
