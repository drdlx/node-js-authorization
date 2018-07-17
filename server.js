/*const fs = require('fs');
const http_port = process.env.PORT;
const http = require('http');

const https = require('https');
const https_port = process.env.PORT_HTTPS;

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/authrecn.ml/fullchain.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/authrecn.ml/privkey.pem'),
};

app.use(require('helmet')());

http.createServer(app).listen(http_port);
https.createServer(options, app).listen(https_port);*/
/*const server = https.createServer(options, app).listen(http_port, function() {
  console.log('Express server listening on port ' + https_port);
});*/



/*http.createServer(function(req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'].replace(http_port, https_port) + req.url });
  console.log("http request, will go to >> ");
  console.log("https://" + req.headers['host'].replace(http_port,https_port) + req.url );
  res.end();

}).listen(http_port);*/