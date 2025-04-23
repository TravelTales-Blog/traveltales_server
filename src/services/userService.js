const UserDao = require("../dao/userDao");
const CustomError = require("../utils/errorHandler");

class UserService {
    async deactivateUser(userId) {
        try {
            if (!userId) {
                throw new CustomError(404, 'User Id required');
            }
            const changes = await UserDao.deactivateUser(userId);

            if (changes === 0) {
                throw new CustomError(404, 'User not found');
            }

            return { message: 'User deactivated' };

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw new CustomError(500, 'Error is deactivating User');
        }
    }

    async activateUser(userId) {
        try {
            if (!userId) {
                throw new CustomError(404, 'User Id required');
            }
            const changes = await UserDao.activateUser(userId);

            if (changes === 0) {
                throw new CustomError(404, 'User not found');
            }
            return { message: 'User activated' };

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw new CustomError(500, 'Error is activating User');
        }
    };

    async findAllUsers(userId) {
        try {
            if (!userId) {
                throw new CustomError(404, 'User Id required');
            }
            const users = await UserDao.findAllUsers(userId);
            return users;
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw new CustomError(500, 'Error is fetching Users');
        }
    };

    async findUserById(userId) {
        try {
            if (!userId) {
                throw new CustomError(404, 'User Id required');
            }
            const user = await UserDao.findById(userId);
            return user;

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw new CustomError(500, 'Error is fetching User');
        }
    };
}

module.exports = new UserService();