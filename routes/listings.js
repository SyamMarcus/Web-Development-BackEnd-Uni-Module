/** Express router providing listing related routes
 * @module routers/listings
 * @author Syam Marcus
 * @see index/* for using route in koa app
 */

const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
//const auth = require('../controllers/auth');
const model = require('../models/listings');
//const can = require('../permissions/users');
const {validateListing} = require('../controllers/validation');

/** Define route handlers and set URI paths*/
const router = Router({prefix: '/TCS/listings'});
router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById); 
router.post('/', bodyParser(), validateListing, createListing);
router.put('/:id([0-9]{1,})', bodyParser(), validateListing, updateListing);


/**
 * function to set response for the getAll route handler
 * @param {object} ctx - The Koa request/response context object
*/
async function getAll(ctx) {
  let articles = await model.getAll();
  if (articles.length) {
    ctx.body = articles;
  }
}

/**
 * function to set response for the getById route handler
 * @param {object} ctx - The Koa request/response context object
*/
async function getById(ctx) {
  let id = ctx.params.id;
  let article = await model.getById(id);
  if (article.length) {
    ctx.body = article[0];
  }
}

/**
 * function to set response for the createListing route handler
 * @param {object} ctx - The Koa request/response context object
*/
async function createListing(ctx) {
  const body = ctx.request.body;
  let result = await model.create(body);
  if (result) {
    ctx.status = 201;
    ctx.body = {ID: result.insertId}  
  }
}

/**
 * function to set response for the updateListing route handler
 * @param {object} ctx - The Koa request/response context object
*/
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
      ctx.body = {ID: id, updated: true, link: ctx.request.path};
    }
  }
}


module.exports = router;