const db = require('../config/db');

class FollowDao {
  static async follow(follower_id, followee_id) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO follows (follower_id, followee_id) VALUES (?, ?)`,
        [follower_id, followee_id],
        function (err) {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  }

  static async unfollow(follower_id, followee_id) {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM follows WHERE follower_id = ? AND followee_id = ?`,
        [follower_id, followee_id],
        function (err) {
          if (err) return reject(err);
          resolve(this.changes);
        }
      );
    });
  }

  static async getAllFollowers(user_id) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT u.user_id, u.username, u.email FROM users u JOIN follows f ON u.user_id = f.follower_id WHERE f.followee_id = ? ORDER BY f.created_at DESC`, 
        [user_id],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }

  static async getAllFollowing(user_id) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT u.user_id, u.username, u.email FROM users u JOIN follows f ON u.user_id = f.followee_id WHERE f.follower_id = ? ORDER BY f.created_at DESC`,
        [user_id],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }
}

module.exports = FollowDao;
