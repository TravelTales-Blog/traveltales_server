// src/config/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(
  path.join(__dirname, '../../database.sqlite'),
  (err) => {
    if (err) console.error('DB Connection Error:', err);
    else console.log('Connected to SQLite DB');
  }
);

db.serialize(() => {
  db.run(`PRAGMA foreign_keys = ON;`);

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      user_id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      username TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_used DATETIME,
      is_active INTEGER DEFAULT 1
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      post_id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      country TEXT NOT NULL,
      visit_date DATE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS follows (
      follower_id TEXT NOT NULL,
      followee_id TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY(follower_id, followee_id),
      FOREIGN KEY(follower_id) REFERENCES users(user_id) ON DELETE CASCADE,
      FOREIGN KEY(followee_id) REFERENCES users(user_id) ON DELETE CASCADE
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS reactions (
      reaction_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      post_id TEXT NOT NULL,
      type TEXT CHECK(type IN ('like','dislike')) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (post_id) REFERENCES posts(post_id)
    )
  `);
});

module.exports = db;
