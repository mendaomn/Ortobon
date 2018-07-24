const cms = {
  prodotti: require( '../cms/cms.prodotti' ),
}

const DOMAIN = 'http://www.orto-bon.it'

function sitemapRoute( req, res ) {
  const pages = [
    `${DOMAIN}/`,
    `${DOMAIN}/prodotti`,
    `${DOMAIN}/about`,
  ]

  const products = []

  cms.prodotti.getData().then( data => {
    data.forEach( p => {
      if (p.active) {
        products.push({
          url: `${DOMAIN}/prodotti/${p.id}`
        })
      }
    })

    res.locals.pages = pages
    res.locals.products = products
  
    res.set('Content-Type', 'text/xml');
    res.status( 200 ).render( 'sitemap' );
  })

}

module.exports = sitemapRoute;
