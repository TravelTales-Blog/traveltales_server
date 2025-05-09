const express = require('express');
const logger = require('./src/middleware/logger');
const errorHandler = require('./src/middleware/errorHandler');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const postRoutes = require('./src/routes/postRoutes');
const followRoutes = require('./src/routes/followRoutes');
const reactRoutes = require('./src/routes/reactionRoutes');
const commentRoutes = require('./src/routes/commentRoutes');
const healthcheckRoute = require('./src/routes/healthcheckRoute');
const cookieParser = require('cookie-parser');

require('dotenv').config()

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(logger);

app.use('/api/healthcheck', healthcheckRoute);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/follow', followRoutes);
app.use('/api/react', reactRoutes);
app.use('/api/comment', commentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});