var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var BlogPost = require('../../../models/blogPost');

router.get('/', function (req, res, next) {
	res.render('./templates/newPost');
});

router.post('/', function (req, res, next) {
	// res.json({
	// 	title: req.body.title,
	// 	body: req.body.content
	// });
	var newPostObj = {
		title: req.body.title,
		content: req.body.content
	};

	var newPost = new BlogPost(newPostObj);
	newPost.save(function (err) {
		if (err) {
			return next(err);
		}

		console.log('Blog post created!');
		res.redirect('/posts');
	})
})


module.exports = router;