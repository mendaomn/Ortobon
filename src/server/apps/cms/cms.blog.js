const keystone = require('keystone');
const BlogList = keystone.list('BlogPage');

class CMSBlog {
  static getData () {
    return BlogList.model
      .find()
      .then( array => array[0] );
  }
}

module.exports = CMSBlog;
