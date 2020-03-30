const RootRouter = require('express').Router();
const auth = require('./auth');

RootRouter.use('/auth', auth);

module.exports = RootRouter;
