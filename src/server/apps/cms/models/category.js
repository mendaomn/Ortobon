var keystone = require( 'keystone' ),
  Types = keystone.Field.Types;

var Category = new keystone.List( 'Category', {
  autokey: {
    from: 'name',
    path: 'slug',
    unique: true
  },
  path: 'categoria',
  label: 'Categoria',
  singular: 'Categoria',
  plural: 'Categorie',
} );

Category.add( {
  name: {
    type: String,
    required: true
  }
} );

Category.register();
