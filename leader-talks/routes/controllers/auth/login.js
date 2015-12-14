var express = require('express');
var router = express.Router();

module.exports = function(passport) {

    router.get('/', function(req, res) {
        res.render('./templates/login', {
            message: req.flash('message')
        });
    });

    router.post('/', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    }));

    return router;

}
