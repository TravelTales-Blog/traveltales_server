const express = require('express');
const logger = require('./src/middleware/logger');
const errorHandler = require('./src/middleware/errorHandler');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const healthcheckRoute = require('./src/routes/healthcheckRoute');

require('dotenv').config()

const app = express();
app.use(express.json());

app.use(logger);

app.use('/api/healthcheck', healthcheckRoute);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});