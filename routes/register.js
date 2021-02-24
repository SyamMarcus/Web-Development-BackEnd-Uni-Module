// This file will define the API route handlers for Articles
const Router = require('koa-router');

// We are going to parse request bodies so import koa-bodyparser
const bodyParser = require('koa-bodyparser')
const model = require('../models/register');

const router = Router({prefix: '/TCS/register'});

router.post('/', bodyParser(), createUser);


async function createUser(ctx) {
    const body = ctx.request.body;
    const result = await model.add(body);
    if (result.affectedRows) {
      const id = result.insertId;
      ctx.status = 201;
      ctx.body = {ID: id, created: true, link: `${ctx.request.path}/${id}`};
    }
  }
  
  module.exports = router;