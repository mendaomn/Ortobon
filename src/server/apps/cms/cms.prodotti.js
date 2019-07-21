const keystone = require( 'keystone' );
const ProdottoList = keystone.list( 'Prodotto' );

class CMSProdotti {
  static getData() {
    return ProdottoList.model
      .find()
  }

  static getDataByID( id ) {
    return ProdottoList.model
      .findById( id )
      .populate( 'recipes' )
      .catch(err => console.error(err));
  }
  
  static getDataBySlug( slug ) {
    return ProdottoList.model
      .findOne( {slug} )
      .populate( 'recipes' );
  }
}

module.exports = CMSProdotti;
