const keystone = require('keystone');
const AboutList = keystone.list('AboutPage');

class CMSAbout {
  static getData () {
    return AboutList.model
      .find()
      .then( array => array[0] );
  }
}

module.exports = CMSAbout;
