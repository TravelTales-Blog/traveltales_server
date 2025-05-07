const postService = require('../services/postService');

class PostController {
    async createPost(req, res, next) {
        try {
            const data = req.body;
            const post = await postService.createPost(data);
            res.status(201).json(post);
        } catch (error) {
            next(error);
        }
    }

    async findAllPosts(req, res, next) {
        try {
            const posts = await postService.findAllPosts();
            res.status(200).json(posts);

        } catch (error) {
            next(error);
        }
    };
    

    async findPostById(req, res, next) {
        try {
            const { postId } = req.query;
            const post = await postService.findPostById(postId);
            res.status(200).json(post);
        } catch (error) {
            next(error);
        }
    }

    async updatePost(req, res, next) {
        try {
            const data = req.body
            const result = await postService.updatePost(data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async deletePost(req, res, next) {
        try {
            const { postId } = req.query;
            const result = await postService.deletePost(postId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async filterPosts(req, res, next) {
        try {
            const { country, author, page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;
            const posts = await postService.listPosts({ country, author, limit, offset });
            res.status(200).json({ posts, page });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PostController();
