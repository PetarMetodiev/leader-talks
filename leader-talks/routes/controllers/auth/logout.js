var express = require('express');
var router = express.Router();

module.exports = function(passport) {

    router.get('/', function(req, res) {
        req.logout();
        // if any problems with logout occur, see this: http://stackoverflow.com/a/19132999
        res.redirect('/');
    })

    return router;
}