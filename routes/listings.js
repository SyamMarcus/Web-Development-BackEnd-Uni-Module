const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const auth = require('../controllers/auth');
const model = require('../models/listings');
const can = require('../permissions/users');

const router = Router({prefix: '/TCS/listings'});

router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById); 
router.post('/', bodyParser(), createListing);

async function getAll(ctx) {
  let articles = await model.getAll();
  if (articles.length) {
    ctx.body = articles;
  }
}

async function getById(ctx) {
  let id = ctx.params.id;
  let article = await model.getById(id);
  if (article.length) {
    ctx.body = article[0];
  }
}


async function createListing(ctx) {
  const body = ctx.request.body;
  let result = await model.create(body);
  if (result) {
    ctx.status = 201;
    ctx.body = {ID: result.insertId}  
  }
}



module.exports = router;