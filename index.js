// The Canine Shelter API

const Koa = require('koa');

const app = new Koa(); 

const register = require('./routes/register.js');

app.use(register.routes()); 


let port = process.env.PORT || 3000; app.listen(port);