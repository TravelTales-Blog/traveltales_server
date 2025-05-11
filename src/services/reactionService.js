const ReactionDao = require('../dao/reactionDao');
const CustomError = require('../utils/errorHandler');

class ReactionService {
  async react(userId, postId, type) {
    if (!postId) throw new CustomError(400, 'postId query param required');
    if (!['like', 'dislike'].includes(type)) {
      throw new CustomError(400, 'Invalid reaction type');
    }
    return ReactionDao.react(userId, postId, type);
  }

  async undoReaction(userId, postId) {
    if (!postId) throw new CustomError(400, 'postId query param required');
    const changes = await ReactionDao.remove(userId, postId);
    if (changes === 0) {
      throw new CustomError(404, 'No reaction to remove');
    }
    return { message: 'Reaction removed' };
  }

  async getCounts(postId) {
    if (!postId) throw new CustomError(400, 'postId query param required');
    return ReactionDao.countByPost(postId);
  }

  async getUserReaction(userId, postId) {
    if (!userId || !postId) {
      throw new CustomError(400, 'userId and postId are required');
    }
    return ReactionDao.getUserReaction(userId, postId);
  }
}

module.exports = new ReactionService();
