/** The Canine Shelter API server host file to run koa routes
 * @module index
 * @author Syam Marcus
 */

const Koa = require('koa');

const app = new Koa(); 

/** Get routes */
const home = require('./routes/home.js');
const register = require('./routes/register.js');
const listings = require('./routes/listings.js');

/** Run routes */
app.use(home.routes()); 
app.use(register.routes()); 
app.use(listings.routes());

/** Set the server port */
let port = process.env.PORT || 3000; app.listen(port);