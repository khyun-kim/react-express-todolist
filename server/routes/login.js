const Router = require('express').Router();
Router.get('/', (req, res) => {
    const session = req.session;
    console.log('this is get method');
    console.log(`session ID : ${req.sessionID} email : ${session.email}`);
    res.send(req.session);
});
Router.post(`/`, (req, res) => {
    const session = req.session;
    console.log('this is post method');
    session.email = 'aa@aaa.com';
    console.log(session);
    console.log(req.sessionID);
    res.send(req.session);
});
module.exports = Router;
