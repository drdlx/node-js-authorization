var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./user');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

//REGISTER ENDPOINT
router.post('/register', function(req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name : req.body.name,
    password : hashedPassword
    //pidor : req.body.pidor
  },
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user.");
    //create a jsonwebtoken
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 43200 //expires in 12 hours
    });

    res.status(200).send({ auth: true, token: token });
  });
});

//GETS USER ID BASED ON TOKEN
router.post('/me', function(req, res) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({auth: false, message: "No token provided"});

  jwt.verify(token, config.secret, function(arr, decoded) {
    if (err) return res.status(500).send({auth: false, message: "Failed to authenticate token."});
  });
});

module.exports = router;
