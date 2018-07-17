const express = require('express');
const app = express();
const fs = require('fs');
const http_port = process.env.PORT;
const http = require('http');
const AuthController = require('./auth/AuthController');
const https = require('https');
const https_port = process.env.PORT_HTTPS;
require('./db');
global.__root = __dirname + '/';

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/authrecn.ml/fullchain.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/authrecn.ml/privkey.pem'),
  };
//API status
app.get('/api', function(req, res){
    res.status(200).send('API works!');
});

app.use('/api/auth', AuthController);


/*const server = https.createServer(options, app).listen(http_port, function() {
  console.log('Express server listening on port ' + https_port);
});*/

app.use(require('helmet')());

http.createServer(app).listen(http_port);
https.createServer(options, app).listen(https_port);
module.exports = app;
