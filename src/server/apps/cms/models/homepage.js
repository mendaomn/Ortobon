var keystone = require( 'keystone' ),
  Types = keystone.Field.Types;

var HomePage = new keystone.List( 'HomePage', {
  autokey: {
    from: 'name',
    path: 'slug',
    unique: true
  },
  path: 'pagina-home',
  label: 'Pagina Home',
  singular: 'Pagina Home',
  plural: 'Pagina Home',
  nocreate: true,
  nodelete: true
} );

HomePage.add( {
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    label: "Titolo di pagina"
  },
  meta_description: {
    type: Types.Textarea,
    height: 50,
    label: "Descrizione, per i motori di ricerca"
  },
  cta: {
    type: String,
    label: "Tasto per cominciare a sfogliare i prodotti"
  },
  stepstitle1: {
    type: String,
    label: "Titolo della sezione coi 3 passaggi, parte superiore"
  },
  stepstitle2: {
    type: String,
    label: "Titolo della sezione coi 3 passaggi, parte inferiore"
  },
  step1: {
    type: Types.Html,
    wysiwyg: true,
    height: 50,
    label: "Testo del primo passaggio"
  },
  step2: {
    type: Types.Html,
    wysiwyg: true,
    height: 50,
    label: "Testo del secondo passaggio"
  },
  step3: {
    type: Types.Html,
    wysiwyg: true,
    height: 50,
    label: "Testo del terzo passaggio"
  },
  productstitle: {
    type: String,
    label: "Titolo della sezione sui prodotti"
  },
  productstext: {
    type: Types.Html,
    wysiwyg: true,
    height: 50,
    label: "Testo sui prodotti"
  },
  productscta: {
    type: String,
    label: "Tasto per cominciare a sfogliare i prodotti"
  },
  articlestitle: {
    type: String,
    label: "Titolo della sezione sugli articoli"
  },
  articlestext: {
    type: Types.Html,
    wysiwyg: true,
    height: 50,
    label: "Testo sugli articoli"
  },
  articlescta: {
    type: String,
    label: "Tasto per cominciare a sfogliare gli articoli"
  },
} );

HomePage.register();
