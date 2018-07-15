var keystone = require( 'keystone' ),
  Types = keystone.Field.Types;

var AboutPage = new keystone.List( 'AboutPage', {
  autokey: {
    from: 'name',
    path: 'slug',
    unique: true
  },
  path: 'pagina-about',
  label: 'Pagina About',
  singular: 'Pagina About',
  plural: 'Pagina About',
  nocreate: true,
  nodelete: true
} );

AboutPage.add( {
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
  },
  section1: {
    title: {
      type: String,
      label: "Titolo della prima sezione"
    },
    text: {
      type: Types.Html,
      wysiwyg: true,
      height: 50,
      label: "Testo della prima sezione"
    },
    image: {
      type: Types.CloudinaryImage,
      label: "Immagine della prima sezione"
    }
  },
  section2: {
    title: {
      type: String,
      label: "Titolo della seconda sezione"
    },
    text: {
      type: Types.Html,
      wysiwyg: true,
      height: 50,
      label: "Testo della seconda sezione"
    },
    image: {
      type: Types.CloudinaryImage,
      label: "Immagine della seconda sezione"
    }
  },
  section3: {
    title: {
      type: String,
      label: "Titolo della terza sezione"
    },
    text: {
      type: Types.Html,
      wysiwyg: true,
      height: 50,
      label: "Testo della terza sezione"
    },
    image: {
      type: Types.CloudinaryImage,
      label: "Immagine della terza sezione"
    }
  }
} );

AboutPage.register();
