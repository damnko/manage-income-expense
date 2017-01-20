var express = require('express');
var router = express.Router();

// Bcrypt for passw encryption
var bcrypt = require('bcrypt');

// Marko installation
require('marko/node-require').install();
var index = require('../views/index.marko');

// DB instance
console.log('requiring');
var db = require('../config/db').getDb();
console.log(db);

// models
var User = require('../models/user');


/* GET home page. */
router.get('/', function (req, res, next) {
  index.render({
  	title: 'Home page',
    isAuth: res.locals.isAuth
  }, res);
});

//
// Handle registration
//
router.post('/register', function (req, res, next){

  var db = res.locals.db;

  console.log('ricevuta richiesta');
  // Check for input errors
  req.checkBody('email', 'Email non puo essere vuota').notEmpty().isEmail();
  req.checkBody('password', 'Password vuota').notEmpty().gte(8);

  var errors = req.validationErrors();
  // Show errors, only available for non javascript enabled clients
  if (errors) {
    console.log('There have been validation errors: ');
    console.log(errors);
    return;
  }

  console.log('email', req.body.email);

  // Check for existing user on db -> redirect for error
  User.findEmail(db, req.body.email, 
    function(err, user){
      if (err) throw err;
      console.log('user', user);
      
      // If the user already exists
      if (user){
        console.log('email gia esistente');
        return res.json({
          errors: ['Email gia esistente']
        });
      }

      // Else register a new user
      bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(req.body.password, salt, function(err, hash) {
              if (err) throw err;

              var user = {
                email: req.body.email,
                password: hash  
              }

              User.insertUser(db, user,
                function (err, doc){
                  if (err) throw err;
                  console.log('inserito nuovo utente', doc);

                  // qui dovrei anche impostare la session di login per fare il login automatico

                  return res.json({
                    success: 'Utente registrato'
                  });
                }
              )

          });
      });
    }
  );
});

var passport = require('passport');
// Require all the passport methods
require('../models/passport')(passport);

//
// Handle login
//
router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    console.log('login successful');
    res.json({
      success: 'login effettuato'
    })
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // res.redirect('/users/' + req.user.username);
    // If authentication is not successfull will return 401 unauthorized
  }
);

// Handle logout
router.get('/logout', function(req, res){
  console.log('user logged out');
  req.logout();
  res.redirect('/');
});

module.exports = router;
