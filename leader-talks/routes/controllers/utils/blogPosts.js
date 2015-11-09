var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var BlogPost = require('../../../models/blogPost');
var _ = require('underscore');


router.get('/', function (req, res, next) {
	BlogPost.find({}, function (err, blogPosts) {
		if (err) {
			return next(err);
		}
		
		var sortedBlogPosts = _.sortBy(blogPosts, function (bp) {
			return -bp.date;
		})

		res.render('./templates/posts', { blogPosts: sortedBlogPosts });

	});
	// res.render('./templates/posts');
});

// TODO: implement get(':id')

module.exports = router;