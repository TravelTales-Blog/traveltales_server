const express = require('express');
const logger = require('./src/middleware/logger');
const healthcheckRoute = require('./src/routes/healthcheckRoute');

require('dotenv').config()

const app = express();
app.use(express.json());

app.use(logger);

app.use('/api/healthcheck', healthcheckRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});