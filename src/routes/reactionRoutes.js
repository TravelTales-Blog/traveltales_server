const express = require('express');
const reactionController = require('../controllers/reactionController');
const csrfProtection = require('../middleware/csrfAuth');
const authenticateJWT = require('../middleware/jwtAuth');

const router = express.Router();

router.use(csrfProtection);
router.use(authenticateJWT);

router.post('/react', reactionController.react);

router.delete('/undoReact', reactionController.undo);

router.get('/getCount', reactionController.count);

module.exports = router;
