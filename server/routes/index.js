const RootRouter = require('express').Router();
const LoginRotuer = require('./login');
const RegisterRotuer = require('./register');

RootRouter.use('/login', LoginRotuer);
RootRouter.use('/register', RegisterRotuer);

module.exports = RootRouter;
