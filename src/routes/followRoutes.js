const express = require('express');
const followController = require('../controllers/followController');
const csrfProtection = require('../middleware/csrfAuth');
const authenticateJWT = require('../middleware/jwtAuth');

const router = express.Router();

router.use(csrfProtection);
router.use(authenticateJWT);

router.post('/follow', followController.follow);
router.delete('/unfollow', followController.unfollow);
router.get('/getAllfollowers', followController.getAllFollowers);
router.get('/getAllFollowees', followController.getAllFollowing);

module.exports = router;
