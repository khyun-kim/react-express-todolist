const RootRouter = require('express').Router();
const auth = require('./auth');
const todo = require('./todo');

RootRouter.use('/auth', auth);
RootRouter.use('/todo', todo);

module.exports = RootRouter;
