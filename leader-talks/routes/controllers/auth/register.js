var express = require('express');
var router = express.Router();

module.exports = function(passport) {

    router.get('/', function(req, res) {
        // res.locals.testVar = req.locals.testVar;
        console.log('router: ' + router.locals);
        res.render('./templates/register', {
            message: req.flash('message')
        });
    });

    router.post('/', passport.authenticate('register', {
        successRedirect: '/',
        failureRedirect: '/auth/register',
        failureFlash: true
    }));

    return router;

}
