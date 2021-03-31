/** Express router providing home related routes
 * @module routers/home
 * @author Syam Marcus
 * @see index/* for using route in koa app
 */

const Router = require('koa-router'); 

/** Define route handlers and set URI paths*/
const router = Router({prefix: '/TCS'}); 
router.get('/', defaultResponse); 

/**
 * function to set response for the defaultResponse route handler
 * @param {object} ctx - The Koa request/response context object
*/
function defaultResponse(ctx) { 
  ctx.body = { 
    message: 'Default home page restult of get request'
  } 
} 


module.exports = router;