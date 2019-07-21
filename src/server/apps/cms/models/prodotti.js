var keystone = require( 'keystone' ),
  Types = keystone.Field.Types;

var ProdottiPage = new keystone.List( 'ProdottiPage', {
  autokey: {
    from: 'name',
    path: 'slug',
    unique: true
  },
  path: 'pagina-prodotti',
  label: 'Pagina Prodotti',
  singular: 'Pagina Prodotti',
  plural: 'Pagina Prodotti',
  nocreate: true,
  nodelete: true
} );

ProdottiPage.add( {
  name: {
    type: String,
    required: true
  },
  mastheadtitle: {
    type: String,
    label: "Titolo di pagina"
  },
  meta_description: {
    type: Types.Textarea,
    height: 50,
    label: "Descrizione, per i motori di ricerca"
  }
} );

ProdottiPage.register();
