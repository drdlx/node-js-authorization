const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const User = require('../user/User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');  //change it to a more secure way

//REGISTER ENDPOINT
router.post('/register', function(req, res) {

  let hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name : req.body.name,
    password : hashedPassword
  },
  function (err, user) {
    if (err) return res.status(500).send('There was a problem registering the user.');
    // create a token
    let token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 43200 // expires in 12 hours
    });
    res.status(200).send({ auth: true, token: token, pidor: 'Timur' });
  });
});

//GETS USER ID BASED ON TOKEN
router.get('/me', function(req, res) {
  let token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    User.findById(
      decoded.id,
      { password: 0 },
      function(err, user) {
        if (err) return res.status(500).send('There was a problem finding the user.');
        if (!user) return res.status(404).send('No user found.');
        //res.status(200).send(decoded);
        next(user);
      });
  });
});

//LOGIN function
router.get('/login', function (req, res) {
  User.findOne({login: req.body.login}, function(err, user){
    if(err) return res.status(500).send('Error on the server side.');
    if(!user) return res.status(404).send('No user found.');

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    let token = jwt.sign({ id: user.id, }, config.secret, {
      expiresIn: 43200 //expires in 12 hours
    });

    res.status(200).send({ auth: true, token: token});
  });
});

//LOGOUT function
router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;
