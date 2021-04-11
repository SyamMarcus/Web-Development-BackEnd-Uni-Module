/** Express router providing listing related routes
 * @module routers/listings
 * @author Syam Marcus
 * @see index/* for using route in koa app
 */

const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const auth = require('../controllers/auth');
const model = require('../models/listings');
const can = require('../permissions/users');
const { validateListing } = require('../controllers/validation');

/** Define route handlers and set URI paths */
const router = Router({ prefix: '/TCS/listings' });
router.get('/', getAll);
router.get('/search', getBySearch);
router.get('/:id([0-9]{1,})', getById);
router.post('/', bodyParser(), auth, validateListing, createListing);
router.put('/:id([0-9]{1,})', bodyParser(), validateListing, updateListing);
router.del('/:id([0-9]{1,})', deleteListing);

/**
 * function to set response for the getAll route handler
 * @param {object} ctx - The Koa request/response context object
 * @returns {object} A JSON body of an array of listing objects from the model
*/
async function getAll(ctx) {
  let { limit = 10, page = 1, fields = null } = ctx.request.query;

  // ensure params are integers
  limit = parseInt(limit);
  page = parseInt(page);

  // validate values to ensure they are sensible
  limit = limit > 100 ? 100 : limit;
  limit = limit < 1 ? 10 : limit;
  page = page < 1 ? 1 : page;

  let listings = await model.getAll(limit, page);

  if (listings.length) {
    if (fields !== null) {
      // first ensure the fields are contained in an array
      // need this since a single field in the query is passed as a string
      if (!Array.isArray(fields)) {
        fields = [fields];
      }
      // then filter each row in the array of results
      // by only including the specified fields
      listings = listings.map((record) => {
        partial = {};
        // eslint-disable-next-line no-restricted-syntax
        for (field of fields) {
          partial[field] = record[field];
        }
        return partial;
      });
    }
    ctx.status = 200;
    ctx.body = listings;
  } else {
    ctx.status = 404;
  }
}

/**
 * function to set response for the getAll route handler
 * @param {object} ctx - The Koa request/response context object
 * @returns {object} A JSON body of an array of listing objects from the model
*/
async function getBySearch(ctx) {
  // eslint-disable-next-line prefer-const
  let { q = null, limit = 10, page = 1 } = ctx.request.query;

  // ensure params are integers
  limit = parseInt(limit);
  page = parseInt(page);

  // validate values to ensure they are sensible
  limit = limit > 100 ? 100 : limit;
  limit = limit < 1 ? 10 : limit;
  page = page < 1 ? 1 : page;

  // validate query
  q = `%${q}%`;

  const listings = await model.getBySearch(q, limit, page);

  if (listings.length) {
    ctx.status = 200;
    ctx.body = listings;
  } else {
    ctx.status = 404;
  }
}

/**
 * function to set response for the getById route handler
 * @param {object} ctx - The Koa request/response context object
 * @returns {object} A JSON body of a listing object from the model
*/
async function getById(ctx) {
  const id = ctx.params.id;
  const listing = await model.getById(id);
  if (listing.length) {
    ctx.status = 200;
    ctx.body = listing[0];
  } else {
    ctx.status = 404;
  }
}

/**
 * function to set response for the createListing route handler
 * @param {object} ctx - The Koa request/response context object
 * @returns {object} A JSON body containing the resulting listing ID from the model
*/
async function createListing(ctx) {
  const user = ctx.state.user;
  const permission = can.readAll(user);
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    const result = await model.create(body);
    if (result) {
      ctx.status = 201;
      ctx.body = { ID: result.insertId, created: true };
    }
  }
}

/**
 * function to set response for the updateListing route handler
 * @param {object} ctx - The Koa request/response context object
 * @returns {object} A JSON body containing information about the updated listing
 */
async function updateListing(ctx) {
  const id = ctx.params.id;
  let result = await model.getById(id);
  if (result.length) {
    const listing = result[0];
    // exclude fields that should not be updated
    const {
      ID, dateCreated, dateModified, authorID, ...body
    } = ctx.request.body;
    // overwrite updatable fields with remaining body data
    Object.assign(listing, body);
    result = await model.update(listing);
    if (result.affectedRows) {
      ctx.status = 201;
      ctx.body = { ID: id, updated: true, link: ctx.request.path };
    }
  }
}

/**
 * function to set response for the deleteListing route handler
 * @param {object} ctx - The Koa request/response context object
*/
async function deleteListing(ctx) {
  const id = ctx.params.id;
  const result = await model.deleteListing(id);
  if (result) {
    ctx.status = 201;
  } else {
    ctx.status = 404;
  }
}

module.exports = router;
