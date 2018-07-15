import DOMHelpers from '../libs/dom-helpers';
import StateManager from '../libs/state-manager';

export default class CommentsListController {
  constructor() {
    this._renderedComments = [];
    this._buttonString = `<button class="c-article-comments__item-delete js-delete-btn"></button>`;

    // dom elements
    this.$list = document.querySelector( '.js-comments-list' );
  }

  update() {
    const state = StateManager.getState();


    if ( state.newComment._id && this._renderedComments.indexOf( state.newComment._id ) === -1 ) {
      this._renderedComments.push( state.newComment._id );
      this.$list.appendChild( this._renderComment( state.newComment ) );
    }

    if ( state.id ) {
      if ( !this.$commentsUserCanEdit ) {
        this._initcommentsUserCanEdit();
      }

      this._addButtonToCommentsUserCanEdit();
    }

    if ( state.toDeleteComment ) {
      let commentEl = document.querySelector( `[data-comment-id="${state.toDeleteComment}"]` );
      if ( commentEl )
        commentEl.remove();
    }
  }

  _renderComment( comment ) {
    var html = `
      <li class="o-card c-article-comments__item" data-author-id="${comment.author.id}" data-comment-id="${comment._id}">
        ${this._buttonString}
        <div class="c-article-comments__item-name">${comment.author.name}</div>
        <div class="c-article-comments__item-content">${comment.content.replace(/@\w*\b/g, "<strong>$&</strong>")}</div>
      </li>
    `;

    return DOMHelpers.stringToDom( html.trim() );
  }

  _initcommentsUserCanEdit() {
    const state = StateManager.getState();
    this.$commentsUserCanEdit = document.querySelectorAll( `[data-author-id="${state.id}"]` );
  }

  _addButtonToCommentsUserCanEdit() {
    var self = this;
    DOMHelpers.loopNodeList( this.$commentsUserCanEdit, function( el ) {
      if ( el.querySelector( 'c-article-comments__item-delete' ) )
        return;

      let buttonEl = DOMHelpers.stringToDom( self._buttonString );
      el.insertBefore( buttonEl, el.firstChild );
    } )
  }
}
