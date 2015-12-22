/* global __dirname */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config/config');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');
var expressSession = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// Passport and express-session configuration
app.use(expressSession({
  secret: 'dfkljmvig589cmwr23rKURAMIQNKO',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

mongoose.connect(config.dbTestUrl + config.dbTestName);

var initPassport = require('./config/passport/init');
initPassport(passport);

// middleware to see if the user is logged in or not.
app.use(function(req, res, next) {
  res.locals.user = {
    login: req.isAuthenticated()
  };

  if (req.isAuthenticated()) {
    res.locals.user.email = req.user.email;
    res.locals.user.role = req.user.role;
  }

  next();
});

app.use(require('./routes')(passport));

app.all('*', function(req,res,next){
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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
