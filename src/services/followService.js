const FollowDao = require('../dao/followDao');
const CustomError = require('../utils/errorHandler');

class FollowService {
    async followUser(followerId, followeeId) {
        try {
            if (followerId === followeeId) {
                throw new CustomError(400, 'Cannot follow yourself');
            }
            const follow = FollowDao.follow(followerId, followeeId);
            return follow;
        } catch (error) {
            throw new CustomError(500, "Error in follow");
        }
    }

    async unfollowUser(followerId, followeeId) {
        try {
            const changes = await FollowDao.unfollow(followerId, followeeId);
            if (changes === 0) {
                throw new CustomError(404, 'Follow relationship not found');
            }
            return { message: 'Unfollowed successfully' };
        } catch (error) {
            throw new CustomError(500, "Error in unfollow");
        }

    }

    async getAllFollowers(userId) {
        try {
            const followers = FollowDao.getAllFollowers(userId);
            return followers;
        } catch (error) {
            throw new CustomError(500, "Error in retriving followers");
        }
    }

    async getAllFollowing(userId) {
        try {
            const followings = FollowDao.getAllFollowing(userId);
            return followings;
        } catch (error) {
            throw new CustomError(500, "Error in retriving followings");
        }
    }
}

module.exports = new FollowService();
