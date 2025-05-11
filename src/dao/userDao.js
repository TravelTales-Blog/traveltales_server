const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class UserDao {
    static async create(email, password, username, role) {
        const user_id = uuidv4();
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO users (user_id, email, password, username, role) VALUES (?, ?, ?, ?, ?)`,
                [user_id, email, password, username, role],
                function (err) {
                    if (err) reject(err);
                    else resolve({ user_id, email, username, role });
                }
            );
        });
    }

    static async findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM users WHERE email = ?',
                [email],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });
    }

    static async findById(id) {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT user_id, email, username, role, is_active FROM users WHERE user_id = ?',
                [id],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });
    }

    static async findAllUsers(id) {
        return new Promise((resolve, reject) => {
            db.all(
                'SELECT user_id, email, username, role, is_active FROM users WHERE user_id != ?',
                [id],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
    }

    static async updateLastUsed(id) {
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE users SET last_used = CURRENT_TIMESTAMP WHERE user_id = ?',
                [id],
                function (err) {
                    if (err) reject(err);
                    else resolve(this.changes);
                }
            );
        });
    }

    static async deactivateUser(id) {
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE users SET is_active = 0 WHERE user_id = ?',
                [id],
                function (err) {
                    if (err) reject(err);
                    else resolve(this.changes);
                }
            );
        });
    }

    static async activateUser(id) {
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE users SET is_active = 1 WHERE user_id = ?',
                [id],
                function (err) {
                    if (err) reject(err);
                    else resolve(this.changes);
                }
            );
        }
        );
    }

}

module.exports = UserDao;