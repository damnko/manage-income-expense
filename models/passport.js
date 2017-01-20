
var User = require('./user');

var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

module.exports = function(passport){
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(username, password, done) {
      var db = require('../config/db').getDb();
      User.findEmail(db, username, function (err, user){
        console.log('richiesta login con username', user);
        if (err) { return done(err); }
        if (!user) {
          console.log('Incorrect username.');
          return done(null, false, { message: 'Incorrect username.' });
        }
        bcrypt.compare(password, user.password, function(err, res) {
          if (!res){
            console.log('Incorrect password.');
            return done(null, false, { message: 'Incorrect password.' });
          }
          console.log('login OK.');
          return done(null, user);
        });
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    console.log('serializing user');
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('deserializing user with id', id);
    var db = require('../config/db').getDb();
    User.findById(db, id, function (err, user) {
      done(err, user);
    });
  });
}