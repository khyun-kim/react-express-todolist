const RootRouter = require('express').Router();
const auth = require('./auth');
const LoginRotuer = require('./login');
const RegisterRotuer = require('./register');

RootRouter.use('/auth', auth);

module.exports = RootRouter;
