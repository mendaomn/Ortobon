const moment = require('moment');
const keystone = require( 'keystone' );
const ArticoloList = keystone.list( 'Articolo' );
const CommentList = keystone.list( 'Comment' );

class CMSArticoli {
  static getData() {
    return ArticoloList.model
      .find()
  }

  static getDataById( id ) {
    return ArticoloList.model
      .findById( id )
      .populate( 'comments' )
  }

  static getLatest() {
    return CMSArticoli.getData()
      .sort( '-date' )
      .then( articles => {
        return {
          recipe: articles.find( article => article.isRecipe ),
          article: articles.find( article => !article.isRecipe )
        }
      } );
  }

  static newComment( postId, comment ) {
    var newComment = new CommentList.model();

    newComment.name = comment.author.id + Date.now();
    newComment.content = comment.content
      .replace(/@\w*\b/g, "<strong>$&</strong>");
    newComment.author = comment.author;

    newComment.save();

    return ArticoloList.model
      .findById( postId )
      .then( post => {
        post.comments.push( newComment._id );
        post.save();
        return newComment._id;
      } )
  }

  static deleteComment( commentId ) {
    return CommentList.model
      .findById( commentId )
      .remove();
  }

  static _expandTagsInPost( post ) {
    post.tags = post.tags
      .split( ',' )
      .filter( String ); // remove empty strings
    return post;
  }

  static _truncateContent( post ) {
    post.content = post.content.substring( 0, 140 );
    return post;
  }

  static _formatDate( post ) {
    post.date = moment(post.date).format('DD MMM YYYY');
    return post;
  }
}

module.exports = CMSArticoli;
