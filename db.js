let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/charts');
mongoose.Promise = global.Promise;
