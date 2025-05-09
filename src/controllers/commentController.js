const commentService = require('../services/commentService');

class CommentController {
  async createComment(req, res, next) {
    try {
      const { userId, postId, comment } = req.body;
      const result = await commentService.createComment(userId, postId, comment);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getCommentById(req, res, next) {
    try {
      const { commentId } = req.query;
      const comment = await commentService.getCommentById(commentId);
      res.status(200).json(comment);
    } catch (err) {
      next(err);
    }
  }

  async updateComment(req, res, next) {
    try {
      const { commentId, comment } = req.body;
      const result = await commentService.updateComment(commentId, comment);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const { commentId } = req.query;
      const result = await commentService.deleteComment(commentId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getCommentsByPostId(req, res, next) {
    try {
      const { postId } = req.query;
      const comments = await commentService.getCommentsByPostId(postId);
      res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CommentController();
