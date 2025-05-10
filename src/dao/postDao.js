const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class PostDao {
    static async createPost(user_id, title, content, country, visit_date) {
        const post_id = uuidv4();
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO posts (post_id, user_id, title, content, country, visit_date) VALUES (?, ?, ?, ?, ?, ?)`,
                [post_id, user_id, title, content, country, visit_date],
                function (err) {
                    if (err) return reject(err);
                    resolve({ post_id, user_id, title, content, country, visit_date });
                });
        });
    }

    static async findAllPosts() {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT 
                posts.post_id, 
                posts.title, 
                posts.content, 
                posts.country, 
                posts.visit_date, 
                users.username 
             FROM posts 
             JOIN users ON posts.user_id = users.user_id 
             ORDER BY posts.created_at DESC`,
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
    }

    static async findByPostId(post_id) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM posts WHERE post_id = ?`, [post_id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    static async updatePost(post_id, title, content, country, visit_date) {
        return new Promise((resolve, reject) => {
            db.run(`UPDATE posts SET title = ?, content = ?, country = ?, visit_date = ? WHERE post_id = ?`,
                [title, content, country, visit_date, post_id],
                function (err) {
                    if (err) return reject(err);
                    if (this.changes === 0) return resolve(null);


                    db.get(`SELECT * FROM posts WHERE post_id = ?`, [post_id], (err, row) => {
                        if (err) return reject(err);
                        resolve(row);
                    });
                });
        });
    }

    static async deletePost(id) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM posts WHERE post_id = ?`, [id], function (err) {
                if (err) return reject(err);
                resolve(this.changes);
            });
        });
    }

    static async filterPosts({ country, author, limit = 10, offset = 0 }) {
        // build dynamic WHERE clauses
        const clauses = [];
        const params = [];

        if (country) {
            clauses.push(`p.country LIKE ?`);
            params.push(`%${country}%`);
        }

        if (author) {
            clauses.push(`u.username LIKE ?`);
            params.push(`%${author}%`);
        }

        const whereClause = clauses.length
            ? `WHERE ${clauses.join(' AND ')}`
            : '';

        params.push(limit, offset);

        return new Promise((resolve, reject) => {
            db.all(`
          SELECT
            p.*,
            u.username AS username
          FROM posts p
          JOIN users u
            ON p.user_id = u.user_id
          ${whereClause}
          ORDER BY p.created_at DESC
          LIMIT ? OFFSET ?
        `, params, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static async findByFollowees(follower_id) {
        return new Promise((resolve, reject) => {
            db.all(`
            SELECT
              p.post_id,
              p.user_id,
              p.title,
              p.content,
              p.country,
              p.visit_date,
              p.image_url,
              u.username
            FROM posts p
            JOIN users u ON p.user_id = u.user_id
            WHERE p.user_id IN (
              SELECT followee_id
              FROM follows
              WHERE follower_id = ?
            )
            ORDER BY p.created_at DESC
          `, [follower_id], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }


}

module.exports = PostDao;
