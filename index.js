const app = require('./app');

/** Set the server port */
const port = process.env.PORT || 3030; app.listen(port);

console.log(`API server running on port ${port}`);
