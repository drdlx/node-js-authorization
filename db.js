let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');
mongoose.Promise = global.Promise;
