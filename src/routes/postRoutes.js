const express = require('express');
const csrfProtection = require('../middleware/csrfAuth');
const authenticateJWT = require('../middleware/jwtAuth');
const postController = require('../controllers/postController');

const router = express.Router();

router.use(csrfProtection);
router.use(authenticateJWT);

router.get('/', (req, res) => {
    res.status(200).json({ message: 'post service' });
});
router.get('/getAllPosts', postController.findAllPosts);
router.get('/getPostByPostId', postController.findPostById);
router.get('/filterPost', postController.filterPosts);
router.get('/getPostOfFollows', postController.getPostOfFollowees);
router.get('/getPostByUserId', postController.getPostsByUser);
router.post('/createPost',  postController.createPost);
router.put('/updatePost', postController.updatePost);
router.delete('/deletePost', postController.deletePost);

module.exports = router;
