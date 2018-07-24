import DOMHelpers from '../libs/dom-helpers';
import StateManager from '../libs/state-manager';
import Products from '../libs/products-manager';
import Filters from '../libs/product-filters';
import { ShopifyManager, Options} from '../libs/shopify-manager';

export default class ProductsController {
  constructor() {
    this._$el = document.querySelector('.js-prodotti-list');

    // autobind
    this._renderProduct = this._renderProduct.bind(this);
    this._renderTemplate = this._renderTemplate.bind(this);

    window.productsList.sort( (a, b) => a.name > b.name ? 1 : -1 )
  }
  
  update() {
    this._$el.innerHTML = "";
    
    window.productsList.forEach( this._renderProduct );
    ShopifyManager.initBuyButtons( Options.productsList );
  }

  _renderProduct( product ) {
    const state = StateManager.getState();

    if ( !Filters.isProductVisible( product, state ) ) {
      return;
    }

    const html = this._renderTemplate( product );
    this._$el.innerHTML += html;
  }

  _renderTemplate( product ) {
    const prodottoClassList = `c-prodotto__image ${ product.offer ? 'has-offer' : ''}`;
    const priceClassList = `${ product.offer ? 'c-prodotto__invalid-price-container' : 'c-prodotto__price-container'}`;
    const bioTmpl = `<div class="o-tag">Bio</div>`;
    const prodPropriaTmpl = `<div class="o-tag">Dall'orto</div>`;
    // const prodPropriaTmpl = `<img class="c-prodotto__prod-propria-icon" src="/static/images/optimized/prod-propria.png">`;
    const offerTmpl = product.offer ? `<div class="c-prodotto__price-container">
    <div class="c-prodotto__price-label">${product.offerlabel}</div>
    <div class="c-prodotto__price-value">${product.offer}€</div>
  </div>` : '';
    const pricePerKgTmpl = `<div class="c-prodotto__price-label">${product.pricePerKg}€ Al Kg</div>`

    return `<a class="o-card c-prodotto" href="/prodotti/${product.id}" id="${product.id}" data-id="${product.id}">
    <div class="${prodottoClassList}"
        style="background-image: url(${product.image})">
    </div>
    <div class="c-prodotto__info-wrapper">
      <div class="c-prodotto__name">
        ${product.name}
      </div>
      ${product.pricePerKg ? pricePerKgTmpl : ''}
      <div class="c-prodotto__tags">
        ${product.bio ? bioTmpl : ''}
        ${product.prodPropria ? prodPropriaTmpl : ''}
      </div>
      
      <div class="c-prodotto__buy-button js-buy-button" data-shopifyID="${product.shopifyID}"></div>
    </div>
  </a>`;
  }
}

{/* <div class="c-prodotto__price-and-offer">
        <div class="${priceClassList}">
          <div class="c-prodotto__price-label">${product.pricelabel}</div>
          <div class="c-prodotto__price-value">${product.price}€</div>
        </div>
        ${offerTmpl}
      </div> */}