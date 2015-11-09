var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var mongoose = require('mongoose');

router.get('/', function (req, res) {
	User.find({}, function (err, users) {
		res.send(users);
	})
});

module.exports = router;