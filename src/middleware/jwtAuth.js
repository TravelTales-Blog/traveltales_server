const { verifyToken } = require('../config/jwt');
const CustomError = require('../utils/errorHandler');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    try {
        if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
            return next();
        }
        const token = authHeader.split(' ')[1];

        const decodedToken = verifyToken(token);
        if (!decodedToken) {
            throw new CustomError(403, 'Invalid JWT token');
        }

        next();
    } catch {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new CustomError(401, 'Authorization header missing or malformed');
        }

        throw new CustomError(500, 'Error in JWT validation');
    }
};

module.exports = authenticateJWT;
