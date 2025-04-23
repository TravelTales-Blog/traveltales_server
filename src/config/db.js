const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../../database.sqlite'));

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY ,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            username TEXT NOT NULL,
            role TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            last_used DATETIME,
            is_active BOOLEAN DEFAULT 1
        )
    `);
});

module.exports = db;