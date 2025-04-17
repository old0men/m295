const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'my_library',
        description: 'this is a library consulting app'
    },
    host: 'localhost:3000/swagger-ui'
};

const outputFile = './swagger-output.json';
const routes = ['./library_swagger.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);