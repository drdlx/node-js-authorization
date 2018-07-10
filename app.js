const express = require('express');
const app = express();
const db = require('./db');
global.__root = __dirname + '/';

//API status
app.get('/api', function(req, res){
    res.status(200).send('API works!');
});

/*const UserController = require('./user/UserController');
app.use('/users', UserController);*/

const AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;
