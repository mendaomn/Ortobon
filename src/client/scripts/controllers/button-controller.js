import DOMHelpers from '../libs/dom-helpers';
import StateManager from '../libs/state-manager';
import MastrofoodAPI from '../libs/mastrofood-api';

export default class ButtonController {
  constructor() {
    this.$btn = document.querySelector( '.js-comment-btn' );

    this.$btn.addEventListener( 'click', this._onClick.bind( this ) );
  }

  update() {
    const state = StateManager.getState();

    if ( state.isButtonActive ) {
      this.$btn.classList.remove( 'o-button--inactive' );
    } else {
      this.$btn.classList.add( 'o-button--inactive' );
    }
  }

  _onClick() {
    const state = StateManager.getState();
    const comment = {
      _id: Date.now(),
      content: state.commentContent,
      author: {
        name: state.name,
        id: state.id
      }
    };
    const postId = /blog\/(\w*)/.exec( location.pathname )[ 1 ];

    MastrofoodAPI.sendComment( postId, comment )
    .then(commentId => {
      document.querySelector(`[data-comment-id="${comment._id}"]`)
        .dataset.commentId = commentId;
    });

    this._emptyCommentContent();
    this._addCommentToPage( comment );
  }

  _emptyCommentContent() {
    const state = StateManager.getState();
    state.commentContent = '';
    state.isButtonActive = false;

    StateManager.setState( state );
  }

  _addCommentToPage( comment ) {
    const state = StateManager.getState();
    state.newComment = comment;

    StateManager.setState( state );
  }
}
