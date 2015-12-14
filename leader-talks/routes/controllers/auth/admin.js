var express = require('express');
var router = express.Router();

module.exports = function(passport) {

    router.get('/', function(req, res) {
        res.render('./templates/admin');
    });

    return router;

}
