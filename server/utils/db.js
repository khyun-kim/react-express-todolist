const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite3');
db.run('PRAGMA foreign_keys=1;');
db.run(
    'CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT)'
);
db.run(
    `CREATE TABLE IF NOT EXISTS TodoLists (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        userID INTEGER NOT NULL, 
        todo TEXT NOT NULL, 
        done INTEGER NOT NULL, 
        CONSTRAINT user_id_fk FOREIGN KEY(userID) REFERENCES User(id) )`
);
module.exports = db;
