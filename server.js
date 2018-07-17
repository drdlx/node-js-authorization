const fs = require('fs');
const app = require('./app');
const http_port = process.env.PORT;
const http = require('http');

const https = require('https');
const https_port = process.env.PORT_HTTPS;

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

/*const server = https.createServer(options, app).listen(http_port, function() {
  console.log('Express server listening on port ' + https_port);
});*/

app.use(require('helmet')());

http.createServer(app).listen(process.env.HTTPPORT);
const server = https.createServer(options, app).listen(process.env.HTTPSPORT);

/*http.createServer(function(req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'].replace(http_port, https_port) + req.url });
  console.log("http request, will go to >> ");
  console.log("https://" + req.headers['host'].replace(http_port,https_port) + req.url );
  res.end();

}).listen(http_port);*/
