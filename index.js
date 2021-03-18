// The Canine Shelter API
const cors = require('@koa/cors');
const Koa = require('koa');

const app = new Koa(); 
app.use(cors());

const home = require('./routes/home.js');
const register = require('./routes/register.js');
const listings = require('./routes/listings.js');

app.use(home.routes()); 
app.use(register.routes()); 
app.use(listings.routes());

let port = process.env.PORT || 3000; app.listen(port);