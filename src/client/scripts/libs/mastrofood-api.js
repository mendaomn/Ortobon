import fetch from 'unfetch';

export default {
  sendComment( postId, comment ) {
    const payload = {
      postId,
      comment
    };

    return fetch( '/newcomment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( payload )
      } )
      .then( res => res.json() )
  },

  deleteComment( commentId ) {
    const payload = {
      commentId
    };

    fetch( '/deletecomment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( payload )
      } )
      .then( res => {
        console.log( res );
      } )
  }
}
