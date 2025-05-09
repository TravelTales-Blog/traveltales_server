const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class CommentDao {
  static async createComment(user_id, post_id, commentText) {
    const comment_id = uuidv4();
    return new Promise((resolve, reject) => {
      db.run( `
        INSERT INTO comments (comment_id, user_id, post_id, comment)
        VALUES (?, ?, ?, ?)
      `, [comment_id, user_id, post_id, commentText], function(err) {
        if (err) return reject(err);
        resolve({ comment_id, user_id, post_id, comment: commentText });
      });
    });
  }

  static async getCommentById(comment_id) {
    return new Promise((resolve, reject) => {
      db.get(`
        SELECT
          c.comment_id   AS commentId,
          c.comment      AS comment,
          c.created_at   AS createdAt,
          u.user_id      AS userId,
          u.username,
          u.email
        FROM comments c
        JOIN users u ON c.user_id = u.user_id
        WHERE c.comment_id = ?
      `, [comment_id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  static async updateComment(comment_id, commentText) {
    return new Promise((resolve, reject) => {
      db.run( `
        UPDATE comments
        SET comment = ?, created_at = CURRENT_TIMESTAMP
        WHERE comment_id = ?
      `, [commentText, comment_id], function(err) {
        if (err) return reject(err);
        resolve(this.changes);
      });
    });
  }

  static async deleteComment(comment_id) {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM comments WHERE comment_id = ?`,
        [comment_id],
        function(err) {
          if (err) return reject(err);
          resolve(this.changes);
        }
      );
    });
  }

  static async getCommentsByPost(post_id) {
    return new Promise((resolve, reject) => {
      db.all( `
        SELECT
          c.comment_id   AS commentId,
          c.comment      AS comment,
          c.created_at   AS createdAt,
          u.user_id      AS userId,
          u.username,
          u.email
        FROM comments c
        JOIN users u ON c.user_id = u.user_id
        WHERE c.post_id = ?
        ORDER BY c.created_at ASC
      `, [post_id], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
}

module.exports = CommentDao;
