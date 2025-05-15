const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const doc = {
  info: {
    title: 'W1867571 CW2 API Documentation',
    description: 'Automatically generated documentation for Course Work 2',
  },
  host: `localhost: ${PORT}`, 
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});
