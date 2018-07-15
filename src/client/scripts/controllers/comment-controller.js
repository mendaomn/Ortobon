import DOMHelpers from '../libs/dom-helpers';
import StateManager from '../libs/state-manager';

export default class CommentController {
  constructor() {
    // dom elements
    this.$input = document.querySelector( '.js-comment-input' );

    // autobind
    this._onInputChange = this._onInputChange.bind( this );

    // listeners
    this.$input.addEventListener( 'input', this._onInputChange );
  }

  update() {
    const state = StateManager.getState();

    this.$input.value = state.commentContent;
  }

  _onInputChange( evt ) {
    const string = evt.target.value;
    const state = StateManager.getState();

    state.commentContent = string;
    state.isButtonActive = state.commentContent ? true : false;

    StateManager.setState( state )
  }
}
