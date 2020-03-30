const Router = require('express').Router();

//세션 정보 조회
Rotuer.get('/', (req, res) => {
    const session = req.session;
    if (session.email === undefined) {
        res.status(204).json({ status: 'NOT LOGIN' });
    } else {
        res.json({ status: 'LOGIN', email: session.email });
    }
});

//로그인
Router.post(`/`, (req, res) => {
    const session = req.session;
    // 데이터베이스 조회 처리 후 session email에 주입할 것.
    session.email = 'aa@aaa.com';
    console.log(session);
    console.log(req.sessionID);
    res.send(req.session);
});

//회원가입
Router.put('/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email === undefined || password === undefined) {
        res.status(400).json({
            status: 'INCORRECT REQUEST',
            message: '이메일과 비밀번호를 제대로 입력해주세요.'
        });
    }
});

module.exports = Rotuer;
