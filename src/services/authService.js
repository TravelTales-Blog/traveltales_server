const { comparePassword, hashPassword } = require('../utils/hashPassword');
const UserDao = require('../dao/userDao');
const { generateTokens } = require('../config/jwt');
const logUserActivity = require('../utils/userLogger');
const CustomError = require('../utils/errorHandler');

class AuthService {
    async login(email, password) {
        try {
            const user = await UserDao.findByEmail(email);
            if (!user) throw new CustomError(404, "User not found.");

            const isValid = await comparePassword(password, user.password);
            if (!isValid) throw new CustomError(404, "Invalid password.");

            if (!user.is_active) throw new CustomError(404, "User account is deactivated");

            const { accessToken, csrfToken } = generateTokens(user);

            const userWithoutPassword = { ...user };
            delete userWithoutPassword.password;

            logUserActivity(user.email, user.username, user.role, 'login');
            await UserDao.updateLastUsed(user.id);

            return {
                accessToken,
                csrfToken,
                user: userWithoutPassword
            };
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError(500, "Error in login");
        }
    }

    async register(userData) {
        try {
            const hashedPassword = await hashPassword(userData.password);
            userData.password = hashedPassword;
            const user = await UserDao.create(userData.email, userData.password, userData.username, userData.role);

            const { accessToken, csrfToken } = generateTokens(user);
            
            const userWithoutPassword = { ...user };
            delete userWithoutPassword.password;

            logUserActivity(user.email, user.username, userData.role, 'register');

            return {
                accessToken,
                csrfToken,
                user
            };
        } catch (error) {
            throw new CustomError(500, "Error in registration")
        }
    }
}

module.exports = new AuthService();