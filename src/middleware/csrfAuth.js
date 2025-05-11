const { verifyToken } = require('../config/csrf');
const CustomError = require('../utils/errorHandler');

const csrfProtection = (req, res, next) => {

    const token = req.headers['x-csrf-token'];
    const cookieToken = req.cookies['csrf-token'];
    try {
        if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
            return next();
        }
        if (!token || !cookieToken || token !== cookieToken) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw new CustomError(403, 'Invalid CSRF token');
        }

        if (!verifyToken(token)) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw new CustomError(403, 'Invalid CSRF token');
        }
        next();
    } catch (error) {
        if (error instanceof CustomError) {
            throw error;
        }
        throw new CustomError(500, 'Error in CSRF validation');
    }
};

module.exports = csrfProtection;