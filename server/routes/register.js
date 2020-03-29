const Router = require('express').Router();

Router.get('/', (req, res) => {
    console.log(`[${new Date()}] /api/register $ GET 접근`);
    res.json({
        state: `Error`,
        message: `해당 URL은 GET으로 접근할 수 없습니다.`
    });
});
Router.post('/', (req, res) => {
    console.log(`[${new Date()}] /api/register $ POST 접근`);
    const { email, password } = req.body;
    console.log(`${email}, ${password}`);
    res.send('test');
});
module.exports = Router;
