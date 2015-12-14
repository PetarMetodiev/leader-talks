var express = require('express');
var router = express.Router();

module.exports = function(passport) {

    router.get('/', function(req, res, next) {
        res.render('./templates/pictures');
    });
    
    return router;

}
