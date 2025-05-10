const PostDao = require('../dao/postDao');
const { post } = require('../routes/postRoutes');
const CustomError = require('../utils/errorHandler');

class PostService {
    async createPost(data) {
        try {
            const post = PostDao.createPost(data.user_id, data.title, data.content, data.country, data.visit_date, data.image_url);
            return post;
        } catch (error) {
            throw new CustomError(500, "Error in post create")
        }

    }

    async findAllPosts() {
        try {
            const posts = await PostDao.findAllPosts();
            return posts;
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw new CustomError(500, 'Error is fetching Users');
        }
    };

    async findPostById(postId) {
        try {
            const post = await PostDao.findByPostId(postId);
            if (!post) throw new CustomError(404, 'Post not found');
            return post;
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw new CustomError(500, 'Error is finding post');

        }
    }

    async updatePost(data) {

        try {
            const updatedPost = await PostDao.updatePost(data.post_id, data.title, data.content, data.country, data.visit_date, data.image_url);
            if (!updatedPost) throw new CustomError(404, 'Post not found or no changes');
            return updatedPost;
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw new CustomError(500, 'Error is updating post');
        }

    }

    async deletePost(postId) {
        const changes = await PostDao.deletePost(postId);
        if (changes === 0) throw new CustomError(404, 'Post not found');
        return { message: 'Post deleted' };
    }

    async listPosts(opts) {
        try {
            const posts = PostDao.filterPosts(opts);
            return posts;
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw new CustomError(500, 'Error is fetching Users');
        }
    }

    async getPostOfFollowees(userId) {
        if (!userId) {
            throw new CustomError(400, 'userId query param required');
        }
        return PostDao.findByFollowees(userId);
    }

}

module.exports = new PostService();
