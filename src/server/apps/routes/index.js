var keystone = require('keystone'),
    importRoutes = keystone.importer(__dirname);

const path = require('path')
const expiry = require('static-expiry')

const HashHelper = require('../../utils/hash')

console.log("[App: Routes] initialized.");

const STATIC_PATH = path.join(__dirname, '..', '..', '..', 'client');

const EXPIRY_OPTS = {
  dir: STATIC_PATH
}

// Bind Routes
exports = module.exports = function(app) {
  app.use('/static', expiry(app, EXPIRY_OPTS))
  app.use((req, res, next) => {
    HashHelper.setFurl(app.locals.furl)
    next()
  })  
  app.use('/static', require( './static' ))
  app.use('/', require('./dynamic'));
}
