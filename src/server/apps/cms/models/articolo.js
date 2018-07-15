var keystone = require( 'keystone' ),
  Types = keystone.Field.Types;

var Articolo = new keystone.List( 'Articolo', {
  autokey: {
    from: 'name',
    path: 'slug',
    unique: true
  },
  path: 'articolo',
  label: 'Articolo',
  singular: 'Articolo',
  plural: 'Articoli',
} );

Articolo.add( {
  name: {
    type: String,
    required: true,
    label: "Titolo dell'articolo"
  },
  date: {
    type: Types.Date,
    label: "Data di pubblicazione"
  },
  isRecipe: {
    type: Boolean,
    label: "È una ricetta?"
  },
  intro: {
    type: String,
    label: "Due frasi di introduzione, compariranno nell'anteprima dell'articolo o ricetta"
  },
  content: {
    type: Types.Html,
    wysiwyg: true,
    height: 500,
    label: "Contenuto dell'articolo"
  },
  tags: {
    type: Types.Key,
    separator: ', ',
    label: "Etichette o tag, elencare separando con la virgola"
  },
  comments: {
    type: Types.Relationship,
    ref: 'Comment',
    many: true,
    hidden: true
  }
} );

Articolo.register();
