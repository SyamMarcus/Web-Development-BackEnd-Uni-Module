/** Express router providing register related routes
 * @module routers/register
 * @author Syam Marcus
 * @see index/* for using route in koa app
 */

const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const model = require('../models/users');
const auth = require('../controllers/auth');
const bcrypt = require('bcrypt')
const can = require('../permissions/users');
const {validateUser} = require('../controllers/validation');

/** Define route handlers and set URI paths*/
const router = Router({prefix: '/TCS/register'});
router.get('/', auth, getAll);
router.post('/', bodyParser(), validateUser, createUser);


/**
 * function to set response for the getAll route handler
 * @param {object} ctx - The Koa request/response context object
*/
async function getAll(ctx) {
  const user = ctx.state.user;
  const permission = can.readAll(user);
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    let users = await model.getAll();
    if (users.length) {
      ctx.body = users;
    }
  }
}

/**
 * function to set response for the createUser route handler
 * @param {object} ctx - The Koa request/response context object
*/
async function createUser(ctx) {
  console.log(ctx.request.body)
  const body = ctx.request.body;
  const hash = bcrypt.hashSync(body.password, 10);
  body.password = hash;
  const result = await model.create(body);
  if (result.affectedRows) {
    const id = result.insertId;
    ctx.status = 201;
    ctx.body = {ID: id, created: true, link: `${ctx.request.path}/${id}`};
  }
}
  
  module.exports = router;