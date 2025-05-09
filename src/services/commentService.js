const CommentDao = require('../dao/commentDao');
const CustomError = require('../utils/errorHandler');

class CommentService {
  async createComment(userId, postId, commentText) {
    if (!postId)    throw new CustomError(400, 'postId required');
    if (!commentText) throw new CustomError(400, 'comment required');
    return CommentDao.createComment(userId, postId, commentText);
  }

  async getCommentById(commentId) {
    if (!commentId) throw new CustomError(400, 'commentId required');
    const comment = await CommentDao.getCommentById(commentId);
    if (!comment) throw new CustomError(404, 'Comment not found');
    return comment;
  }

  async updateComment(commentId, commentText) {
    if (!commentId) throw new CustomError(400, 'commentId required');
    if (!commentText) throw new CustomError(400, 'comment required');
    const changes = await CommentDao.updateComment(commentId, commentText);
    if (changes === 0) throw new CustomError(404, 'Comment not found or no change');
    return { message: 'Comment updated' };
  }

  async deleteComment(commentId) {
    if (!commentId) throw new CustomError(400, 'commentId required');
    const changes = await CommentDao.deleteComment(commentId);
    if (changes === 0) throw new CustomError(404, 'Comment not found');
    return { message: 'Comment deleted' };
  }

  async getCommentsByPostId(postId) {
    if (!postId) throw new CustomError(400, 'postId required');
    return CommentDao.getCommentsByPost(postId);
  }
}

module.exports = new CommentService();
