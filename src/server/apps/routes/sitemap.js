const cms = {
  prodotti: require( '../cms/cms.prodotti' ),
}

const DOMAIN = 'http://www.orto-bon.it'

function sitemapRoute( req, res ) {
  const pages = [
    {url: `${DOMAIN}/`, changefreq: 'monthly'},
    {url: `${DOMAIN}/prodotti`, changefreq: 'weekly'},
    {url: `${DOMAIN}/about`, changefreq: 'monthly'}
  ]

  const products = []

  cms.prodotti.getData().then( data => {
    data.forEach( (p, i) => {
      products.push({
        url: `${DOMAIN}/prodotti/${p.slug}`,
        changefreq: 'weekly'
      })
    })

    res.locals.pages = pages
    res.locals.products = products
  
    res.set('Content-Type', 'text/xml');
    res.status( 200 ).render( 'sitemap' );
  })

}

module.exports = sitemapRoute;
