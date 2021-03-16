const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
//const auth = require('../controllers/auth');
const model = require('../models/listings');
//const can = require('../permissions/users');
const {validateListing} = require('../controllers/validation');

const router = Router({prefix: '/TCS/listings'});

router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById); 
router.post('/', bodyParser(), validateListing, createListing);
router.put('/:id([0-9]{1,})', bodyParser(), validateListing, updateListing);

async function getAll(ctx) {
  let articles = await model.getAll();
  if (articles.length) {
    ctx.status = 200;
    ctx.body = articles;
  } else {
    ctx.status = 404;
  }
}

async function getById(ctx) {
  let id = ctx.params.id;
  let article = await model.getById(id);
  if (article.length) {
    ctx.status = 200;
    ctx.body = article[0];
  } else {
    ctx.status = 404;
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


async function updateListing(ctx) {
  const id = ctx.params.id;
  let result = await model.getById(id);  // check it exists
  if (result.length) {
    let article = result[0];
    // exclude fields that should not be updated
    const {ID, dateCreated, dateModified, authorID, ...body} = ctx.request.body;
    // overwrite updatable fields with remaining body data
    Object.assign(article, body);
    result = await model.update(article);
    if (result.affectedRows) {
      ctx.status = 201;
      ctx.body = {ID: id, updated: true, link: ctx.request.path};
    }
  }
}


module.exports = router;