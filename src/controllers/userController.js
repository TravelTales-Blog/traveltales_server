const userService = require('../services/userService');

class UserController {
    async deactivateUser(req, res, next) {
        try {
            const { userId } = req.query;
            const changes = await userService.deactivateUser(userId);
            res.status(200).json(changes);

        } catch (error) {
            next(error);
        }
    }

    async activateUser(req, res, next) {
        try {
            const { userId } = req.query;
            const changes = await userService.activateUser(userId);
            res.status(200).json(changes);

        } catch (error) {
            next(error);
        }
    };

    async findAllUsers(req, res, next) {
        try {
            const { userId } = req.query;
            const users = await userService.findAllUsers(userId);
            res.status(200).json(users);

        } catch (error) {
            next(error);
        }
    };

    async findUserById(req, res, next) {
        try {
            const { userId } = req.query;
            const user = await userService.findUserById(userId);
            res.status(200).json(user);

        } catch (error) {
            next(error);
        }
    };
}


module.exports = new UserController();