var keystone = require( 'keystone' ),
  Types = keystone.Field.Types;

var BlogPage = new keystone.List( 'BlogPage', {
  autokey: {
    from: 'name',
    path: 'slug',
    unique: true
  },
  path: 'pagina-blog',
  label: 'Pagina Blog',
  singular: 'Pagina Blog',
  plural: 'Pagina Blog',
  nocreate: true,
  nodelete: true
} );

BlogPage.add( {
  name: {
    type: String,
    required: true
  },
  meta_description: {
    type: Types.Textarea,
    height: 50,
    label: "Descrizione, per i motori di ricerca"
  },
  mastheadtitle: {
    type: String,
    label: "Titolo di pagina"
  }
} );

BlogPage.register();
