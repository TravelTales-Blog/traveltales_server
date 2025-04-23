const AuthService = require('../services/authService');

class AuthController {
    async register(req, res, next) {
        try {
            const { email, password, username, role } = req.body;
            const result = await AuthService.register({ email, password, username, role });

            res.cookie('jwt', result.accessToken, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            });

            res.cookie('csrf-token', result.csrfToken, {
                httpOnly: false,
                sameSite: 'strict'
            });

            res.status(201).json({
                message: 'Registration successful',
                user: result.user,
                csrfToken: result.csrfToken,
                jwtToken: result.accessToken
            });

        } catch (error) {
            next(error);
        }
    };

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const result = await AuthService.login(email, password);
            if (!result) {
                return res.status(401).json({
                    error: 'Invalid credentials'
                });
            }

            res.cookie('jwt', result.accessToken, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            });

            res.cookie('csrf-token', result.csrfToken, {
                httpOnly: false,
                sameSite: 'strict'
            });

            res.status(200).json({
                message: 'Login successful',
                user: result.user,
                csrfToken: result.csrfToken,
                jwtToken: result.accessToken
            });

        } catch (error) {
            next(error);
        }
    }

    async logout(req, res) {
        res.clearCookie('jwt', { sameSite: 'strict', httpOnly: true });
        res.clearCookie('csrf-token', { sameSite: 'strict' });

        return res.status(200).json({ message: 'Logged out successfully' });
    }

}


module.exports = new AuthController();