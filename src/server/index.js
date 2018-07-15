require('dotenv').load();
require('newrelic');

const keystone = require( 'keystone' );
const moment = require('moment');
const SECRETS = require('./config/secrets')

const PORT = process.env.PORT || 8080;
const MONGO = process.env.MONGODB_URI || SECRETS.MONGODB_URI

keystone.init( {

  'name': 'My Project',
  'port': PORT,

  'auto update': true,
  'updates': 'config',
  'mongo': MONGO,

  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': SECRETS.COOKIE_SECRET,

  'cloudinary config': SECRETS.CLOUDINARY_CONFIG,
  'wysiwyg cloudinary images': true,
  'wysiwyg additional options': {
    'external_plugins': {
      'uploadimage': '/plugins/uploadimage/plugin.min.js'
    }
  }

} );

require( './apps/cms/models' );

keystone.set( 'routes', require( './apps/routes' ) )

moment.locale('it');

keystone.start();
