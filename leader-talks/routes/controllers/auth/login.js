var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('./templates/login');
});

module.exports = router;
