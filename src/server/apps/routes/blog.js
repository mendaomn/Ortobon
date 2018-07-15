const path = require( 'path' );
const fs = require( 'fs' );

const viewPath = path.join( __dirname, '..', '..', '..', 'views' );

const packageReader = require( '../../utils/package-reader' );
const version = packageReader.getVersion();

const navReader = require( '../../utils/nav-reader' );
const navitems = navReader.getNav();

const inlines = {
  css: fs.readFileSync( path.join( viewPath, 'inlines', 'blog.core.css' ), 'utf-8' ),
  js: fs.readFileSync( path.join( viewPath, 'inlines', 'bootstrap.js' ), 'utf-8' ),
};

const preloads = [ {
  path: '/static/styles/blog.later.css',
  type: 'style'
} ];

const cms = {
  blog: require('../cms/cms.blog' ),
  articoli: require( '../cms/cms.articoli' ),
  footer: require( '../cms/cms.footer' )
}

const blogOptions = {
  title: 'I nostri dietisti in articoli e ricette - Ortobon',
  version,
  navitems,
  inlines,
  preloads
};

// Set "Prodotti" to active
blogOptions.navitems[ 3 ].active = true;

function blogRoute( req, res ) {

  Promise.all( [
      cms.blog.getData(),
      cms.articoli.getData(),
      cms.footer.getData()
    ] )
    .then( cmsData => {
      let [ blogData, pageData, footerData ] = cmsData;

      pageData = pageData.map( post => post.toJSON() )
        .map( cms.articoli._formatDate )
        .map( cms.articoli._expandTagsInPost )
        .map( cms.articoli._truncateContent );

      pageData.mastheadtitle = blogData.mastheadtitle;
      
      blogOptions.content = pageData;
      blogOptions.footer = footerData;

      res.status( 200 ).render( 'blog', blogOptions );
    } );

}



module.exports = blogRoute;
