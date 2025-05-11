const express = require('express');
const commentController = require('../controllers/commentController');
const csrfProtection = require('../middleware/csrfAuth');
const authenticateJWT = require('../middleware/jwtAuth');

const router = express.Router();

router.use(csrfProtection);
router.use(authenticateJWT);

router.get('/getCommentsByPostId', commentController.getCommentsByPostId);
router.get('/getCommentById', commentController.getCommentById);
router.post('/createComment', commentController.createComment);
router.patch('/updateComment', commentController.updateComment);
router.delete('/deleteComment', commentController.deleteComment);
router.get('/getCount', commentController.getCommentCount);

module.exports = router;
