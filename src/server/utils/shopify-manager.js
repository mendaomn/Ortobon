const fetch = require('node-fetch');
const Client = require('shopify-buy');
const SECRETS = require('../config/secrets')

global.fetch = fetch;

const DOMAIN = 'ortobon.myshopify.com';
const URL_PRE = SECRETS.SHOPIFY_HOST;
const CREATE_PRODUCT_URL = `${URL_PRE}/admin/products.json`;
const GET_PRODUCT_URL = id => `${URL_PRE}/admin/products/${id}`;
const COLLECTS_URL = `${URL_PRE}/admin/collects.json`;

const BUY_BUTTON_COLLECTION_ID = 36216700986;

class ShopifyManager {

  static get SDK_URL() {
    return process.env.NODE_ENV === 'production' ? 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js' : 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.js'
  }

  static async init () {
    const client = Client.buildClient( {
      domain: DOMAIN,
      storefrontAccessToken: '859e203775d5b93d20291900d4758f7c'
    } );
    
    // ShopifyManager.products = await client.product.fetchAll();
  }

  static async update( data ) {
    
    return new Promise( async (resolve, reject) => {
      const shouldCreateProduct = await ShopifyManager.shouldCreateProduct( data );

      const payload = {
        product :{
          title: data.name,
          variants: [{
            option1: data.pricelabel || '0.5 Kg',
            price: data.price,
            // weight: data.weight || 0.5
          }],
          images: [{
            src: data.image.secure_url
          }]
        }
      }

      if (data.offer && data.offerlabel) {
        payload.product.variants.push({
          option1: data.offerlabel,
          price: data.offer,
          // weight: data.weight || 0.5
        })
      }
      

      if (shouldCreateProduct) {
        const id = await ShopifyManager.createProduct( payload )
        await ShopifyManager.associateToCollection(id)
        resolve(id);
      } else {
        const putRes = await ShopifyManager.put( GET_PRODUCT_URL( data.shopifyID ), payload )
        resolve( data.shopifyID )
      }

    })
  }

  static async shouldCreateProduct( data ) {
    const { shopifyID } = data
    
    if (!shopifyID) return true;

    const getRes = await ShopifyManager.get( GET_PRODUCT_URL( shopifyID ) )
      
    if (getRes.status === 404) return true;

    return false;
  }

  static async createProduct( data ) {
    const res = await ShopifyManager.post( CREATE_PRODUCT_URL, data );
    const { product } = await res.json().catch( errorHandler );
    const { id } = product

    return id
  }

  static async associateToCollection( id ) {
    const payload = {
      collect: {
        product_id: id,
        collection_id: BUY_BUTTON_COLLECTION_ID
      }
    }
    
    return ShopifyManager.post( COLLECTS_URL, payload)
  }

  static async remove( data ) {
    return ShopifyManager.delete( GET_PRODUCT_URL(data.shopifyID) );
  }

  static async get( url ) {
    return fetch( url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    } )
    .catch( errorHandler )
  }

  static async post( url, data ) {
    return fetch( url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify( data )
    } )
    .catch( errorHandler )
  }

  static async put( url, data ) {
    return fetch( url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify( data )
    } )
    .catch( errorHandler )
  }

  static async delete( url ) {
    return fetch( url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    } )
    .catch( errorHandler )
  }
}

function errorHandler( err ) {
  console.error( err );
}


module.exports = ShopifyManager;