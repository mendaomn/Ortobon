const articoli = require( '../cms/cms.articoli' );

function deletecomment( req, res ) {
  const commentId = req.body.commentId;

  articoli.deleteComment( commentId )
    .then( _ => res.status( 200 ) );
}

module.exports = deletecomment;
