const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const RootRouter = require('./routes');
const db = require('./utils/db');

const app = express();
const PORT = 5000;

app.use(
    session({
        secret: 'ZBshfVlbGrJjRGdJWvJJ00I1Vb3GFzK1',
        resave: true,
        saveUninitialized: true,
        name: 'session',
        rolling: true,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 15, // 15분
            httpOnly: false
        }
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', RootRouter);

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
});
