const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class ReactionDao {
    static async react(userId, postId, type) {
        return new Promise((resolve, reject) => {
            db.get(
                `SELECT reaction_id, type FROM reactions WHERE user_id = ? AND post_id = ?`,
                [userId, postId],
                (err, row) => {
                    if (err) return reject(err);

                    if (row) {
                        if (row.type === type) {
                            db.run(
                                `DELETE FROM reactions WHERE reaction_id = ?`,
                                [row.reaction_id],
                                function (err2) {
                                    if (err2) return reject(err2);
                                    resolve({ action: 'removed', type });
                                }
                            );
                        } else {
                            db.run(
                                `UPDATE reactions SET type = ?, created_at = CURRENT_TIMESTAMP WHERE reaction_id = ?`,
                                [type, row.reaction_id],
                                function (err2) {
                                    if (err2) return reject(err2);
                                    resolve({ action: 'updated', type });
                                }
                            );
                        }
                    } else {
                        const id = uuidv4();
                        db.run(
                            `INSERT INTO reactions (reaction_id, user_id, post_id, type) VALUES (?, ?, ?, ?)`,
                            [id, userId, postId, type],
                            function (err2) {
                                if (err2) return reject(err2);
                                resolve({ action: 'added', type });
                            }
                        );
                    }
                }
            );
        });
    }

    static async remove(userId, postId) {
        return new Promise((resolve, reject) => {
            db.run(
                `DELETE FROM reactions WHERE user_id = ? AND post_id = ?`,
                [userId, postId],
                function (err) {
                    if (err) return reject(err);
                    resolve(this.changes);
                }
            );
        });
    }

    static async countByPost(postId) {
        return new Promise((resolve, reject) => {
            db.all(`SELECT type, COUNT(*) AS count FROM reactions WHERE post_id = ? GROUP BY type`, [postId],
                (err, rows) => {
                    if (err) return reject(err);
                    const result = { like: 0, dislike: 0 };
                    rows.forEach(r => {
                        result[r.type] = r.count;
                    });
                    resolve(result);
                });
        });
    }

    static async getUserReaction(userId, postId) {
        return new Promise((resolve, reject) => {
            db.get(
                `SELECT type
             FROM reactions
             WHERE user_id = ? AND post_id = ?`,
                [userId, postId],
                (err, row) => {
                    if (err) return reject(err);
                    resolve(row ? row.type : null);
                }
            );
        });
    }
}

module.exports = ReactionDao;
