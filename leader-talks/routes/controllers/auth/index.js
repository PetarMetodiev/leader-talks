var express = require('express');
var router = express.Router();

var login = require('./login');
var register = require('./register');
var admin = require('./admin');

router.use('/login', login);
router.use('/register', register);
router.use('/admin-panel', admin);

module.exports = router;