const Router = require('express').Router();
const { passwordCheck, registerEmail } = require('../utils/db_action');

//세션 정보 조회
Router.get('/', (req, res) => {
    console.log(`[REQ] /api/auth $ GET method / ${req.sessionID}`);
    const session = req.session;
    if (session.email === undefined) {
        console.log(`[RES] /api/auth $ 204 / ${req.sessionID}`);
        res.status(204).json({ status: 'NOT LOGIN' });
    } else {
        console.log(`[RES] /api/auth $ LOGIN INFO / ${req.sessionID}`);
        res.json({ status: 'LOGIN', email: session.email });
    }
});
Router.get('/logout', (req, res) => {
    console.log(`[REQ] /api/auth/logout $ GET method / ${req.sessionID}`);
    req.session.destroy((err) => {
        if (err) {
            console.log(`[ERR] /api/auth/logout $ Session destroy Error`);
            console.log(err);
        } else {
            console.log(`[INFO] Session Destroy`);
        }
    });
    res.json({ status: `LOGOUT`, message: 'succsess' });
});

//로그인
Router.post(`/`, (req, res) => {
    console.log(`[REQ] /api/auth $ POST Method / ${req.sessionID}`);
    const email = req.body.email;
    const password = req.body.password;
    if (email !== '' && password !== '') {
        passwordCheck(email, password, (rows) => {
            if (rows) {
                console.log(
                    `[RES] /api/auth $ GET Method LOGIN SUCCESS / ${req.sessionID}`
                );
                req.session.email = email;
                res.json({ status: 'LOGIN SUCCESS' });
            } else {
                console.log(
                    `[RES] /api/auth $ GET Method LOGIN FAILED / ${req.sessionID}`
                );
                res.json({ status: 'LOGIN FAILED' });
            }
        });
    } else {
        res.json({
            status: 'INCORRECT INFO ERROR',
            message: '이메일이나 비밀번호를 입력하지 않았습니다.',
        });
    }
});

//회원가입
Router.put('/', (req, res) => {
    console.log(`[REQ] /api/auth $ PUT method / ${req.sessionID}`);
    const email = req.body.email;
    const password = req.body.password;
    if (email === undefined || password === undefined) {
        console.log(
            `[RES] /api/auth $ PUT method 400 ERROR / ${req.sessionID}`
        );
        res.status(400).json({
            status: 'INCORRECT REQUEST',
            message: '이메일과 비밀번호를 제대로 입력해주세요.',
        });
    } else {
        registerEmail(email, password, (err) => {
            if (err) {
                console.log('에러발생');
                switch (err.errno) {
                    case 19: // 이메일 중복 에러
                        console.log(`이메일 중복에러`);
                        res.json({
                            status: 'CONSTRAINT ERROR',
                            message: '이메일이 중복되었습니다.',
                        });
                        break;
                    default:
                        res.send(err);
                }
            } else {
                const session = req.session;
                session.email = email;
                res.json({ status: 'success', message: '회원가입 완료' });
            }
        });
    }
});

module.exports = Router;
