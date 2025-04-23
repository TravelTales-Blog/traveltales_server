const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();
router.get('/', (req, res) => {
    res.status(200).json({ message: 'auth service' });
});
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);


module.exports = router;