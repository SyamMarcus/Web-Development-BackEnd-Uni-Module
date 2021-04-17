/** Express router providing images related routes
 * @module routers/images
 * @author Syam Marcus
 * @see index/* for using route in koa app
 */

const fileStore = './var/tmp/api/public/images';
const uploadOptions = {
  multipart: true,
  formidable: {
    uploadDir: './tmp/api/uploads',
  },
};

const { copyFileSync, existsSync, createReadStream } = require('fs');
const { v4: uuidv4 } = require('uuid');
const koaBody = require('koa-body')(uploadOptions);
const mime = require('mime-types');

const Router = require('koa-router');

/** Define route handlers and set URI paths */
const router = Router({ prefix: '/TCS/images' });

/**
 * function to set response for image upload requests for listings
 * @param {object} ctx - The Koa request/response context object
 * @returns {object} A JSON body of the upload response with the new imageURL
*/
router.post('/', koaBody, async (ctx) => {
  try {
    const { path, name, type } = ctx.request.files.upload;
    const extension = mime.extension(type);

    // add some logging to help with troubleshooting
    console.log('Uploaded file details:');
    console.log(`path: ${path}`);
    console.log(`filename: ${name}`);
    console.log(`type: ${type}`);
    console.log(`extension: ${extension}`);

    const imageName = uuidv4();
    const newPath = `${fileStore}/${imageName}`;
    copyFileSync(path, newPath);

    ctx.status = 201;
    ctx.body = {
      file: {
        status: 'done',
        path: router.url('get_image', imageName),
      },
    };
  } catch (err) {
    console.log(`error ${err.message}`);
    ctx.throw(500, 'upload error', { message: err.message });
  }
});

/**
 * function to set response for get requests for listing images
 * @param {object} ctx - The Koa request/response context object
 * @returns {object} A JSON body of a readable file path to the image
*/
router.get('get_image', '/:uuid([0-9a-f\\-]{36})', async (ctx) => {
  const uuid = ctx.params.uuid;
  const path = `${fileStore}/${uuid}`;
  try {
    if (existsSync(path)) {
      const src = createReadStream(path);
      ctx.type = 'image/jpeg';
      ctx.body = src;
      ctx.status = 200;
    } else {
      console.log('image not found');
      ctx.status = 404;
    }
  } catch (err) {
    console.log(`error ${err.message}`);
    ctx.throw(500, 'image download error', { message: err.message });
  }
});

module.exports = router;
