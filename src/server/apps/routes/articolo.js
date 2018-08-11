const path = require( 'path' );
const fs = require( 'fs' );

const viewPath = path.join( __dirname, '..', '..', '..', 'views' );

const packageReader = require( '../../utils/package-reader' );
const version = packageReader.getVersion();

const navReader = require( '../../utils/nav-reader' );
const navitems = navReader.getNav();

const inlines = {
  css: fs.readFileSync( path.join( viewPath, 'inlines', 'article.core.css' ), 'utf-8' ),
  js: fs.readFileSync( path.join( viewPath, 'inlines', 'bootstrap.js' ), 'utf-8' ),
};

const preloads = [ {
  path: '/styles/article.later.css',
  type: 'style'
} ];

const cms = {
  articoli: require( '../cms/cms.articoli' ),
  footer: require( '../cms/cms.footer' )
}

const articoloOptions = {
  title: 'Ortobon',
  version,
  navitems,
  scripts: [
    '/scripts/article.js'
  ],
  inlines,
  preloads
};

function articleRoute( req, res ) {
  const article_id = req.params.id;

  // Set "Prodotti" to active
  articoloOptions.navitems[ 3 ].active = true;

  Promise.all( [
      cms.articoli.getDataById( article_id ),
      cms.footer.getData()
    ] )
    .then( cmsData => {
      let [ pageData, footerData ] = cmsData;

      pageData = pageData.toJSON();
      pageData = cms.articoli._formatDate( pageData );
      pageData = cms.articoli._expandTagsInPost( pageData );

      articoloOptions.content = pageData;
      articoloOptions.footer = footerData;

      res.status( 200 ).render( 'articolo', articoloOptions );
    } );

}

module.exports = articleRoute;
