import DOMHelpers from './dom-helpers';

const productsNodes = document.querySelectorAll( '[data-id]' );
const $products = {};

DOMHelpers.loopNodeList( productsNodes, function( node ) {
  $products[ node.dataset.id ] = node;
} );

export default {
  getNodeById(id) {
    return $products[id];
  }
}
