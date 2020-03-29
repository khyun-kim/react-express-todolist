const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite3');

db.run(
    'CREATE TABLE IF NOT EXISTS User (id NUMBER, email TEXT, password TEXT)'
);

module.exports = db;
