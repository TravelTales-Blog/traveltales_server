const followService = require('../services/followService');

class FollowController {
  async follow(req, res, next) {
    try {
      const { followerId, followeeId } = req.query;
      await followService.followUser(followerId, followeeId);
      res.status(200).json({ message: 'Now following' });
    } catch (err) {
      next(err);
    }
  }

  async unfollow(req, res, next) {
    try {
      const { followerId, followeeId } = req.query;
      const result = await followService.unfollowUser(followerId, followeeId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getAllFollowers(req, res, next) {
    try {
      const { userId } = req.query;
      const list = await followService.getAllFollowers(userId);
      res.status(200).json({ followers: list });
    } catch (err) {
      next(err);
    }
  }

  async getAllFollowing(req, res, next) {
    try {
      const { userId } = req.query;
      const list = await followService.getAllFollowing(userId);
      res.status(200).json({ following: list });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new FollowController();
