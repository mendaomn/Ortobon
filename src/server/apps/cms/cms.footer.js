const keystone = require('keystone');
const FooterList = keystone.list('Footer');

class CMSFooter {
  static getData () {
    return FooterList.model
      .find()
      .then( array => array[0] );
  }
}

module.exports = CMSFooter;
