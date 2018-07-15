import StateManager from './libs/state-manager';

import FiltersController from './controllers/filters-controller';
import SearchBoxController from './controllers/searchbox-controller';
import ProductsController from './controllers/products-controller';

window.initialState.currentType = 'all';
window.initialState.currentSearchString = '';

const products = new ProductsController();
const filters = new FiltersController();
const searchbox = new SearchBoxController();

StateManager.subscribe( onStateUpdate );
StateManager.setState( initialState );

function onStateUpdate( state ) {
  products.update();
}
