const keystone = require('keystone');
const CategoriesList = keystone.list('Category');

class CMSCategorie {
  static getData () {
    return CategoriesList.model
      .find()
  }
}

module.exports = CMSCategorie;
