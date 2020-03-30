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
        err => {
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
    passwordCheck
};
