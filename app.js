var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Express validator
var expressValidator = require('express-validator');
// Express session
var session = require('express-session');
// Passport
var passport = require('passport');
// Flash messages
var flash = require('connect-flash');

// DB connection
var routes = require('./routes/index');
var finance = require('./routes/finance');
var reports = require('./routes/reports');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Express validator
app.use(expressValidator({
  customValidators: {
    gte: function(param, num) {
        return param.length >= num;
    }
  }
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport initialize
app.use(session({
  secret: 'pivaSecretPhrase',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next){
  res.locals.prova = 'ciao';
  var db = require('./config/db').getDb();
  console.log('app.use db', db);
  res.locals.db = db;
  next();
});

app.use(function (req,res,next){
  if (!req.user)
    res.locals.isAuth = false
  else
    res.locals.isAuth = true;
  next();
});

// Middleware to check for authentication
function isAuth(req,res,next){
  if (!req.user)
    res.redirect('/');
  next();
}

app.use('/', routes);
// Authentication middleware used in private areas
app.use('/finance', isAuth, finance);
app.use('/reports', isAuth, reports);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// 401 unauthorized access
app.use(function (req,res,next){
  if (req.status == 401)
    res.send('errore 401 accesso non autorizzato');
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
