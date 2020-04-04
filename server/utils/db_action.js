const db = require('./db');

const passwordCheck = (email, password, callback) => {
    // get(sql,callback())
    db.get(
        `SELECT id FROM 'User' WHERE email = '${email}' AND password = '${password}';`,
        (err, rows) => {
            callback(rows);
        }
    );
};

const registerEmail = (email, password, callback) => {
    //db.run(sql,callback(res,err))
    db.run(
        `INSERT INTO User(email,password) values('${email}','${password}');`,
        (err) => {
            if (err) {
                callback(err);
            } else {
                callback();
            }
        }
    );
};
const setTodoDone = (UserID, TodoID, done, callback) => {
    db.run(
        `UPDATE TodoLists set done = ${done} WHERE userID = ${UserID} AND id = ${TodoID};`,
        (err) => {
            if (err) {
                console.log('[ERR] DB UPDATE ERROR');
            }
            callback(err);
        }
    );
};
const getAllTodos = (UserID, callback) => {
    db.all(
        `SELECT id, todo, done FROM TodoLists WHERE userID = ${UserID} ORDER BY id DESC;`,
        (err, rows) => {
            if (err) {
                console.log(err);
            }
            callback(rows);
        }
    );
};

const insertTodo = (UserID, todo, callback) => {
    db.run(
        `INSERT INTO TodoLists(userID,todo,done) values(${UserID},'${todo}',0);`,
        (err) => {
            if (err) {
                callback(err);
            } else {
                callback();
            }
        }
    );
};

module.exports = {
    registerEmail,
    passwordCheck,
    getAllTodos,
    insertTodo,
    setTodoDone,
};
