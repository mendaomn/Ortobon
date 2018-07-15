var keystone = require( 'keystone' ),
  Types = keystone.Field.Types;

var Footer = new keystone.List( 'Footer', {
  autokey: {
    from: 'name',
    path: 'slug',
    unique: true
  },
  path: 'footer',
  label: 'Footer',
  singular: 'Footer',
  plural: 'Footer',
  nocreate: true,
  nodelete: true
} );

Footer.add( {
  name: {
    type: String,
    required: true
  },
  addresstitle: {
    type: String,
    label: "Titolo per l'indirizzo"
  },
  addresstext: {
    type: String,
    label: "Indirizzo"
  },
  contactstitle: {
    type: String,
    label: "Titolo per i contatti"
  },
  phone: {
    type: String,
    label: "Numero di telefono"
  },
  email: {
    type: String,
    label: "Indirizzo email"
  },
  socialtitle: {
    type: String,
    label: "Titolo per i social"
  },
  facebook: {
    type: Types.Url,
    label: "Link a facebook"
  },
  twitter: {
    type: Types.Url,
    label: "Link a twitter"
  },
} );

Footer.register();
