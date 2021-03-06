/** The Canine Shelter API server host file to run koa routes
 * @module app
 * @author Syam Marcus
 */

const cors = require('@koa/cors');
const Koa = require('koa');

const app = new Koa();
app.use(cors());

/** Get routes */
const home = require('./routes/home.js');
const register = require('./routes/register.js');
const listings = require('./routes/listings.js');
const images = require('./routes/images.js');

/** Run routes */
app.use(home.routes());
app.use(register.routes());
app.use(listings.routes());
app.use(images.routes());

module.exports = app;
