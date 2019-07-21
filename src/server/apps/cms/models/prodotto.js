var keystone = require( 'keystone' ),
  Types = keystone.Field.Types,
  ShopifyManager = require('../../../utils/shopify-manager');

var Prodotto = new keystone.List( 'Prodotto', {
  autokey: {
    from: 'name',
    path: 'slug',
    unique: true
  },
  path: 'prodotto',
  label: 'Prodotto',
  singular: 'Prodotto',
  plural: 'Prodotti',
} );

Prodotto.add( {
  name: {
    type: String,
    required: true,
    label: "Nome del prodotto, non dovrebbe MAI cambiare"
  },
  nameAdditions: {
    type: String,
    label: "Aggiunte al nome, es- \"- Basilicata\""
  },
  shopifyID: {
    type: String,
    label: "Shopify ID - Ad uso interno, non modificare"
  },
  bio: {
    type: Boolean,
    label: "È bio?"
  },
  prodPropria: {
    type: Boolean,
    label: "È di produzione propria?"
  },
  active: {
    type: Boolean,
    label: "È da visualizzare nella lista prodotti?"
  },
  type: {
    type: Types.Relationship,
    ref: 'Category',
    label: "Categoria prodotto, esempio \"Frutta\""
  },
  image: {
    type: Types.CloudinaryImage,
    label: "Immagine di copertina del prodotto"
  },
  pricePerKg: {
    type: String,
    label: "Prezzo al kg"
  },
  price: {
    type: String,
    label: "Prezzo per unità (es- prezzo al mezzo kg)"
  },
  pricelabel: {
    type:  String,
    label: "Nome della singola unità ('0.5 kg' se lasciato vuoto)"
  },
  offer: {
    type:  String,
    label: "Prezzo in offerta"
  },
  offerlabel: {
    type:  String,
    label: "Unità di misura dell'offerta, esempio \"Al Kg\""
  },
  description: {
    type: Types.Html,
    wysiwyg: true,
    label: "Descrizione"
  },
  meta_description: {
    type: String,
    height: 50,
    label: "Descrizione, per i motori di ricerca"
  },
  uses: {
    type: Types.Html,
    wysiwyg: true,
    label: "Utilizzi"
  },
  cals: {
    type: String,
    label: "Calorie"
  },
  fats: {
    type: String,
    label: "Grassi"
  },
  prots: {
    type: String,
    label: "Proteine"
  },
  carbs: {
    type: String,
    label: "Carboidrati"
  },
  fibers: {
    type: String,
    label: "Fibre"
  },
  recipes: {
    type: Types.Relationship,
    ref: 'Articolo',
    many: true,
    label: "Ricetta da associare al prodotto"
  },
} );

Prodotto.schema.pre('save',  mirrorToShopify('save'))
Prodotto.schema.pre('remove',  mirrorToShopify('remove'))

function mirrorToShopify( eventName ) {
  return async function ( next ) {
    console.log(`Command: ${eventName}`);
    const product = this;
    
    switch(eventName) {
      case 'save':
      
      const shopifyID = await ShopifyManager.update( product );
      
      if (!product.shopifyID)
        product.shopifyID = shopifyID;

      break;

      case 'remove':
      await ShopifyManager.remove( product );
      break;
    }

    next();
  }
}

Prodotto.register();
