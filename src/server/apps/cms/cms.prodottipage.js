const keystone = require('keystone');
const ProdottiList = keystone.list('ProdottiPage');

class CMSProdotti {
  static getData () {
    return ProdottiList.model
      .find()
      .then( array => array[0] );
  }
}

module.exports = CMSProdotti;
