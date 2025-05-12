const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'W1867571 CW2 API Documentation',
    description: 'Automatically generated documentation for Course Work 1',
  },
  host: 'localhost:3000', 
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});
