const keystone = require('keystone')
const User = keystone.list('User')

const SECRETS = require('./secrets')

exports = module.exports = function(done) {

    new User.model({
        name: { first: 'Andrea', last: 'Mastropietro' },
        email: SECRETS.KEYSTONE_ADMIN_USERNAME,
        password: SECRETS.KEYSTONE_ADMIN_PASSWORD,
        canAccessKeystone: true
    }).save(done);

};
