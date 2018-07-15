import DOMHelpers from '../libs/dom-helpers';
import StateManager from '../libs/state-manager';
import MastrofoodAPI from '../libs/mastrofood-api';

export default class DeleteButtonController {
  constructor() {
    this.$list = document.querySelector( '.js-comments-list' );

    this.$list.addEventListener( 'click', this._onClick.bind( this ) );
  }

  _onClick(evt) {
    if (!evt.target.classList.contains('js-delete-btn'))
      return;

    const $btn = evt.target;
    const commentId = $btn.parentNode.dataset.commentId;

    MastrofoodAPI.deleteComment( commentId );
    this._removeCommentFromPage( commentId );
  }

  _removeCommentFromPage( commentId ) {
    const state = StateManager.getState();
    state.toDeleteComment = commentId;

    StateManager.setState( state );
  }
}
