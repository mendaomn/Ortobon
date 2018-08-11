'use strict';

const express = require('express');
const compression = require('compression');
const path = require('path');
// const expiry = require('static-expiry')

const app = express();

const STATIC_PATH = path.join(__dirname, '..', '..', '..', 'client');
const STATIC_OPTS = {
  maxAge: 31536000000 // One year
};

/* const EXPIRY_OPTS = {
  dir: STATIC_PATH
} */

app.use(compression());
// app.use(expiry(app, EXPIRY_OPTS))
app.use(express.static(STATIC_PATH, STATIC_OPTS));

console.log('[App: Static] initialized.');
module.exports = app;
