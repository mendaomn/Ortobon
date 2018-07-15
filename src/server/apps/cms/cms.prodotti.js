const keystone = require( 'keystone' );
const ProdottoList = keystone.list( 'Prodotto' );

class CMSProdotti {
  static getData() {
    return ProdottoList.model
      .find()
  }

  static getDataById( id ) {
    return ProdottoList.model
      .findById( id )
      .populate( 'recipes' );
  }
}

module.exports = CMSProdotti;
