/**
 * A module to run differnt authentication strategies.
 * @module controllers/auth
 * @author Syam Marcus
 * @see models/* for the models that require this module
 */

const passport = require('koa-passport');
const basicAuth = require('../strategies/basic');

passport.use(basicAuth);

module.exports = passport.authenticate(['basic'], {session:false});