const fs = require('fs');
const app = require('./app');
const port = process.env.PORT;
const http = require('http');
const https = require('https');

const options = {
  key: fs.readFileSync('./ssl/privatekey.pem'),
  cert: fs.readFileSync('./ssl/certificate.pem'),
};

const server = https.createServer(options, app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});
