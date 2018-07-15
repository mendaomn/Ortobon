import DOMHelpers from '../libs/dom-helpers';
import StateManager from '../libs/state-manager';

export default class SearchBoxController {
  constructor() {
    // dom elements
    const $searchbox = document.querySelector( '.js-searchbox' );

    // autobind
    this._onSearchChange = this._onSearchChange.bind(this);

    // listeners
    $searchbox.addEventListener( 'change', this._onSearchChange );
  }

  _onSearchChange( evt ) {
    const string = evt.target.value;
    const state = StateManager.getState();

    state.currentSearchString = string;

    StateManager.setState( state )
  }
}
