import DOMHelpers from '../libs/dom-helpers';
import StateManager from '../libs/state-manager';

export default class CommentController {
  constructor() {
    // dom elements
    this.$name = document.querySelector( '.js-username' );
    this.$toShow = document.querySelectorAll( '[data-show-if-logged]' );
    this.$toHide = document.querySelectorAll( '[data-hide-if-logged]' );
  }

  update() {
    const state = StateManager.getState();

    if ( state.name ) {
      this.$name.innerHTML = state.name;
    }


    if ( state.logged ) {
      DOMHelpers.loopNodeList( this.$toShow, DOMHelpers.removeClass( 'hidden' ) );
      DOMHelpers.loopNodeList( this.$toHide, DOMHelpers.addClass( 'hidden' ) );
    } else {
      DOMHelpers.loopNodeList( this.$toShow, DOMHelpers.addClass( 'hidden' ) );
      DOMHelpers.loopNodeList( this.$toHide, DOMHelpers.removeClass( 'hidden' ) );
    }
  }
}
