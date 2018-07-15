var keystone = require('keystone'),
    importRoutes = keystone.importer(__dirname);

console.log("[App: Routes] initialized.");

// Bind Routes
exports = module.exports = function(app) {
    app.use('/static', require( './static' ))
    app.use('/', require('./dynamic'));
}
