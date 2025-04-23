const errorHandler = (err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || 'Internal server error.';
    
    res.locals.error = {
        status,
        message,
        stack: err.stack
    };

    res.status(status).json({ error: message });
    
};

module.exports = errorHandler;
