/** Express router providing register related routes
 * @module routers/register
 * @author Syam Marcus
 * @see app/* for using route in koa app
 */

const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const bcrypt = require('bcrypt');
const model = require('../models/users');
const auth = require('../controllers/auth');
const { validateUser } = require('../controllers/validation');

/** Define route handlers and set URI paths */
const prefix = '/TCS/register';
const router = Router({ prefix });
router.get('/search', getCode);
router.post('/', bodyParser(), validateUser, createUser);
router.post('/login', auth, login);

/**
 * function to set response for the getCode route handler
 * @param {object} ctx - The Koa request/response context object
 * @returns {object} A JSON body of the query and boolean value for if code was found
*/
async function getCode(ctx) {
  const { code = null } = ctx.request.query;
  const result = await model.getCode(code);
  if (result.length) {
    ctx.status = 200;
    ctx.body = result[0];
  } else {
    ctx.status = 404;
  }
}

/**
 * function to set response for the createUser route handler
 * @param {object} ctx - The Koa request/response context object
 * @returns {object} A JSON body containing information about the created user
*/
async function createUser(ctx) {
  console.log(ctx.request.body);
  const body = ctx.request.body;
  const hash = bcrypt.hashSync(body.password, 10);
  body.password = hash;
  const result = await model.create(body);
  if (result.affectedRows) {
    const id = result.insertId;
    ctx.status = 201;
    ctx.body = { ID: id, created: true, link: `${ctx.request.path}${id}` };
  }
}

/**
 * function to authenticate and login a user
 * @param {object} ctx - The Koa request/response context object
 * @returns {object} A JSON body containing information about the logged in user
*/
async function login(ctx) {
  const {
    ID, username, firstName, lastName, dateRegistered, role, email, avatarURL,
  } = ctx.state.user;
  const links = {
    self: `${ctx.protocol}://${ctx.host}${prefix}/${ID}`,
  };
  ctx.body = {
    ID, username, firstName, lastName, dateRegistered, role, email, avatarURL, links,
  };
  ctx.status = 200;
}

module.exports = router;
