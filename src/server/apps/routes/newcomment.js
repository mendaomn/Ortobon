const articoli = require( '../cms/cms.articoli' );

function newcomment( req, res ) {
  const postId = req.body.postId;
  const comment = req.body.comment;

  articoli.newComment( postId, comment )
    .then( commentId => res.json( commentId ) );
}

module.exports = newcomment;
