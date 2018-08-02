// Key.js - choose dev or prod
if (process.env.NODE_ENV === 'production') {
    // We are  in production - return prod set of keys
    module.exports = require('./prod');
} else {
    // we are in development - return the dev keys!!!
    module.exports = require('./dev'); // We are requiring the dev file here and exporting immediately to whomever wants this.

}