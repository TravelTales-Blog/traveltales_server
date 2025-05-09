const reactionService = require('../services/reactionService');

class ReactionController {
  async react(req, res, next) {
    try {
      const { userId, postId, type } = req.query;
      const result = await reactionService.react(userId, postId, type);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async undo(req, res, next) {
    try {
      const { postId, userId } = req.query;
      const result = await reactionService.undoReaction(userId, postId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async count(req, res, next) {
    try {
      const { postId } = req.query;
      const counts = await reactionService.getCounts(postId);
      res.status(200).json(counts);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ReactionController();
