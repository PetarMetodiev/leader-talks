var express = require('express');
var router = express.Router();

var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}

var isAdmin = function(req, res, next) {
    if (req.user.role === 'admin') {
        return next();
    }

    res.redirect('/');
}

module.exports = {
    isAuthenticated: isAuthenticated,
    isAdmin: isAdmin
};