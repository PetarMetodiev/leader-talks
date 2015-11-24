var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var BlogPost = require('../../../models/blogPost');

router.get('/', function (req, res, next) {
	res.render('./templates/newPost');
});

router.post('/', function (req, res, next) {
	var newPostObj = {
		title: req.body.title,
		content: req.body.content
	};

	var newPost = new BlogPost(newPostObj);
	newPost.save(function (err) {
		if (err) {
			return next(err);
		}
		
		res.redirect('/posts');
	})
})


module.exports = router;