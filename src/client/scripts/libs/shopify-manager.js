import DOMHelpers from './dom-helpers';

const priceTemplate = `<div class="{{data.classes.product.prices}}" data-element="product.prices">
{{#data.selectedVariant}}
<span class="{{data.classes.product.price}} {{data.priceClass}}" data-element="product.price"><span class="{{data.classes.product.compareAt}}">{{data.selectedVariant.title}}</span> {{data.selectedVariant.price}}€</span>
{{#data.selectedVariant.compareAtPrice}}<span class="{{data.classes.product.compareAt}}" data-element="product.compareAt">{{data.formattedCompareAtPrice}}</span>{{/data.selectedVariant.compareAtPrice}}
{{/data.selectedVariant}}
</div>`

export class ShopifyManager {
  static initBuyButtons( options ) {
    if (!window.ShopifyBuy || !window.ShopifyBuy.UI) {
      console.log("Will wait 200ms");
      setTimeout( ShopifyManager.initBuyButtons, 200 );
      return;
    }

    const client = ShopifyManager._getShopifyClient();

    ShopifyBuy.UI.onReady(client).then(ui => {
      const buttons = document.querySelectorAll('.js-buy-button');

      DOMHelpers.loopNodeList(buttons, ShopifyManager._loadBuyButton( ui, options ));
    });
    
  }

  static _getShopifyClient() {
    if (ShopifyManager._shopifyClient) 
      return ShopifyManager._shopifyClient;

    ShopifyManager._shopifyClient = ShopifyBuy.buildClient({
      domain: 'ortobon.myshopify.com',
      storefrontAccessToken: '859e203775d5b93d20291900d4758f7c'
    });

    return ShopifyManager._shopifyClient;
  }

  static _loadBuyButton( ui, options ) {
    return function _loadBuyButtonByNode( node ) {
      const id = node.dataset.shopifyid;
      if (!id) return;
      
      ui.createComponent('product', {
        id,
        node,
        moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
        options
      });
    }
  }
}

export const Options = {
  productPage: {
    "product": {
      "variantId": "all",
      "width": "100%",
      "contents": {
        "img": false,
        "imgWithCarousel": false,
        "title": false,
        "variantTitle": false,
        "price": true,
        "description": false,
        "buttonWithQuantity": false,
        "quantity": false
      },
      "text": {
        "button": "AGGIUNGI AL CARRELLO"
      },
      "styles": {
        "product": {
          "text-align": "left",
          "@media (min-width: 601px)": {
            "max-width": "100%",
            "margin-left": "20px",
            "margin-bottom": "50px"
          }
        },
        "prices": {
          "text-align": "left"
        },
        "price": {
          "font-size": "27px",
          "color": "#cdf031"
        },
        "compareAt": {
          "font-size": "22px",
          "color": "white"
        },
        "options": {
          "max-width": "100% !important"
        },
        "button": {
          "width": "100%",
          "font-size": "12px",
          "padding-top": "15px",
          "padding-bottom": "15px",
          "padding-left": "15px",
          "padding-right": "15px"
        },
        "quantityInput": {
          "font-size": "12px",
          "padding-top": "15px",
          "padding-bottom": "15px"
        }
      }
    },
    "cart": {
      "contents": {
        "button": true
      },
      "text": {
        "title": "Carrello",
        "total": "SUBTOTALE",
        "button": "ORDINA ORA",
        "notice": "Spedizioni e coupons sono aggiunti al checkout.",
        "empty": "Il tuo carrello è vuoto."
      },
      "styles": {
        "button": {
          "font-size": "12px",
          "padding-top": "15px",
          "padding-bottom": "15px"
        },
        "footer": {
          "background-color": "#ffffff"
        }
      }
    },
    "toggle": {
      "styles": {
        "count": {
          "font-size": "12px"
        }
      }
    }
  },
  productsList: {
    "product": {
      "variantId": "all",
      "width": "100%",
      templates: {
        price: priceTemplate
      },
      "contents": {
        "img": false,
        "imgWithCarousel": false,
        "title": false,
        "variantTitle": false,
        "price": true,
        "description": false,
        "buttonWithQuantity": false,
        "quantity": false
      },
      "text": {
        "button": "AGGIUNGI AL CARRELLO"
      },
      "styles": {
        "product": {
          "text-align": "left",
          "@media (min-width: 601px)": {
            "max-width": "100%",
            "margin-left": "20px",
            "margin-bottom": "50px"
          }
        },
        "prices": {
          "text-align": "right"
        },
        "price": {
          "font-size": "22px",
          "color": "black"
        },
        "compareAt": {
          "text-decoration": "unset",
          "font-size": "16px",
          "color": "black"
        },
        "options": {
          "max-width": "100% !important"
        },
        "button": {
          "width": "100%",
          "font-size": "12px",
          "padding-top": "15px",
          "padding-bottom": "15px",
          "padding-left": "15px",
          "padding-right": "15px"
        },
        "quantityInput": {
          "font-size": "12px",
          "padding-top": "15px",
          "padding-bottom": "15px"
        }
      }
    },
    "cart": {
      "contents": {
        "button": true
      },
      "text": {
        "title": "Carrello",
        "total": "SUBTOTALE",
        "button": "ORDINA ORA",
        "notice": "Spedizioni e coupons sono aggiunti al checkout.",
        "empty": "Il tuo carrello è vuoto."
      },
      "styles": {
        "button": {
          "font-size": "12px",
          "padding-top": "15px",
          "padding-bottom": "15px"
        },
        "footer": {
          "background-color": "#ffffff"
        }
      }
    },
    "toggle": {
      "styles": {
        "count": {
          "font-size": "12px"
        }
      }
    }
  }
}