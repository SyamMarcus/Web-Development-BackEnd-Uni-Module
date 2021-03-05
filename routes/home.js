const Router = require('koa-router'); 

const router = Router({prefix: '/TCS'}); 

router.get('/', defaultResponse); 


function defaultResponse(ctx) { 
  ctx.body = { 
    message: 'Default home page restult of get request'
  } 
} 


module.exports = router;