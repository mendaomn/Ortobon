const keystone = require('keystone');
const HomeList = keystone.list('HomePage');

class CMSHome {
  static getData () {
    return HomeList.model
      .find()
      .then( array => array[0] );
  }
}

module.exports = CMSHome;
