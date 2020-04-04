const Router = require(`express`).Router();
const { getAllTodos, insertTodo } = require('../utils/db_action');

Router.get('/', (req, res) => {
    const userID = req.session.index;
    console.log(`[REQ] /api/todo GET Method / ${req.sessionID}`);
    if (userID === undefined) {
        console.log(`[ERR] 유효한 세션이 아닙니다.`);
        res.send('error');
    } else {
        getAllTodos(userID, (rows) => {
            if (rows === undefined) {
                res.json({ status: `success`, rows: [] });
            } else {
                res.json({ status: `success`, rows });
            }
        });
    }
});
Router.put(`/`, (req, res) => {
    console.log(`[REQ] /api/todo PUT Method / ${req.sessionID}`);
    const { todo } = req.body;
    const userID = req.session.index;
    if (todo === undefined) {
        console.log(`[ERR] 내용을 입력하지 않은 요청입니다.`);
        res.json({ status: 'error', message: `내용을 입력해요.` });
    } else if (userID === undefined) {
        console.log(`[ERR] 유효하지 않은 세션입니다.`);
        res.json({ status: 'error', message: '유효하지 않은 세션이에요' });
    } else {
        insertTodo(userID, todo, (err) => {
            if (err) {
                console.log(err);
                res.json({ status: 'error', message: 'Insert Error' });
            } else {
                res.json({ status: 'success' });
            }
        });
    }
});
module.exports = Router;
