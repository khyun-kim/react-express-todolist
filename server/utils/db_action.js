const db = require('./db');

const registerEmail = (email, password, callback) => {
    //db.run(sql,callback(res,err))
    db.run(
        `INSERT INTO User(email,password) values('${email}','${password}')`,
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
    registerEmail
};
