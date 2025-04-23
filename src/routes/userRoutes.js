const express = require('express');
const csrfProtection = require('../middleware/csrfAuth');
const authenticateJWT = require('../middleware/jwtAuth');
const userController = require('../controllers/userController');

const router = express.Router();

router.use(csrfProtection);
router.use(authenticateJWT);

router.get('/', (req, res) => {
    res.status(200).json({ message: 'user service' });
});
router.get('/getAllUsers', userController.findAllUsers);
router.get('/getUser/userId', userController.findUserById);
router.patch('/deactivateUser/userId', userController.deactivateUser);
router.patch('/activateUser/userId', userController.activateUser);


module.exports = router;