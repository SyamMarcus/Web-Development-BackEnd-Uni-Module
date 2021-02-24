const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const model = require('../models/register');

const router = Router({prefix: '/TCS/register'});

router.post('/', bodyParser(), createUser);


async function createUser(ctx) {
    const body = ctx.request.body;
    const result = await model.create(body);
    if (result.affectedRows) {
      const id = result.insertId;
      ctx.status = 201;
      ctx.body = {ID: id, created: true, link: `${ctx.request.path}/${id}`};
    }
  }
  
  module.exports = router;