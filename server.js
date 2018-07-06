var app = require('./app');
var port = process.env.PORT || 3000; //wonder if the port shoud be 27017

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
