var express = require('express');
var router = express.Router();

var login = require('./login');
var register = require('./register');
var admin = require('./admin');
var logout = require('./logout');


module.exports = function(passport) {
    router.use('/login', login(passport));
    router.use('/register', register(passport));
    router.use('/admin-panel', admin(passport));
    router.use('/logout', logout);
    
    return router;
}