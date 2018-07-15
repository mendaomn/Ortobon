import DOMHelpers from '../libs/dom-helpers';
import StateManager from '../libs/state-manager';

export default class FiltersController {
  constructor() {
    // dom elements
    const $filters = document.querySelectorAll( '[data-filter-type]' );

    // autobind
    this._addFilterListener = this._addFilterListener.bind(this);

    // listeners
    DOMHelpers.loopNodeList( $filters, this._addFilterListener );
  }

  _addFilterListener( node ) {
    node.addEventListener( 'change', this._onFilterChange );
  }

  _onFilterChange( evt ) {
    const state = StateManager.getState();
    const type = evt.target.dataset.filterType;

    if ( !type ) return;

    state.currentType = type;

    StateManager.setState( state )
  }
}
