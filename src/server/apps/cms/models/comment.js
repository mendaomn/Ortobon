var keystone = require( 'keystone' ),
  Types = keystone.Field.Types;

var Comment = new keystone.List( 'Comment', {
  autokey: {
    from: 'name',
    path: 'slug',
    unique: true
  },
  path: 'commento',
  label: 'Commento',
  singular: 'Commento',
  plural: 'Commenti',
  hidden: true,
  nocreate: true,
  noedit: true,
  nodelete: true
} );

Comment.add( {
  name: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  author: {
    id: {
      type: String,
    },
    name: {
      type: String,
    }
  }
} );

Comment.register();
