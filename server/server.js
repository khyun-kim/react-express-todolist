const express = require('express');
const bodyParser = require('body-parser');
const RootRouter = require('./routes');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', RootRouter);

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
});
