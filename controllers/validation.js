const {Validator, ValidationError} = require('jsonschema');

const listingSchema = require('../schemas/listing.json').definitions.listing;
const userSchema = require('../schemas/user.json').definitions.user;


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

exports.validateUser = makeKoaValidator(userSchema, 'user');
exports.validateListing = makeKoaValidator(listingSchema, 'listing');
