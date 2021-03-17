/**
 * A module to run JSON Schema based validation on request/response data.
 * @module controllers/validation
 * @author Syam Marcus
 * @see schemas/* for JSON Schema definition files
 */

const {Validator, ValidationError} = require('jsonschema');

const listingSchema = require('../schemas/listing.json').definitions.listing;
const userSchema = require('../schemas/user.json').definitions.user;

/**
 * Koa middleware handler function to do validation
 * @param {object} ctx - The Koa request/response context object
 * @param {function} next - The Koa next callback
 * @throws {ValidationError} a jsonschema library exception
*/
const makeKoaValidator = (schema, resource) => {
  const v = new Validator();
  const validationOptions = {
    throwError: true,
    propertyName: resource
  };
  
  const handler = async (ctx, next) => {
    const body = ctx.request.body;
    try {
      v.validate(body, schema, validationOptions);
      await next();
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error(error);
        ctx.status = 400
        ctx.body = error;
      } else {
        throw error;
      }
    }
  }
  return handler;
}

/** Validate data against user schema */
exports.validateUser = makeKoaValidator(userSchema, 'user');
/** Validate data against listing schema */
exports.validateListing = makeKoaValidator(listingSchema, 'listing');
