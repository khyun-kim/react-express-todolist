const Router = require('express').Router();
Router.get('/', (req, res) => {
    res.json({
        state: `Error`,
        message: `해당 URL은 GET으로 접근할 수 없습니다.`
    });
});
module.exports = Router;
