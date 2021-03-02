const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const model = require('../models/users');
const auth = require('../controllers/auth');
const bcrypt = require('bcrypt')
const can = require('../permissions/users');
const {validateUser} = require('../controllers/validation');


const router = Router({prefix: '/TCS/register'});
router.get('/', auth, getAll);
router.post('/', bodyParser(), validateUser, createUser);

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