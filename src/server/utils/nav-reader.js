'use strict';

const fs = require('fs');
const path = require('path');

class NavReader {
  static getNav () {
    const navPath = path.join( __dirname, '..', '/config/nav.json' );
    const nav = JSON.parse(fs.readFileSync(navPath, 'utf-8'));

    return nav;
  }
}

module.exports = NavReader;
