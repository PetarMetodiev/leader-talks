var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var BlogPost = require('../../../models/blogPost');
var _ = require('underscore');
var moment = require('moment');


router.get('/', function (req, res, next) {
	BlogPost.find({}, function (err, blogPosts) {
		if (err) {
			return next(err);
		}

		var sortedBlogPosts = _.sortBy(blogPosts, function (bp) {
			var relativeDate = moment(bp.date).calendar();
			bp.relativeDate = relativeDate;
			return -bp.date;
		})


		res.render('./templates/posts', { blogPosts: sortedBlogPosts });

	});
});

router.get('/:id', function (req, res, next) {
	BlogPost.findById(req.params.id, function (err, blogpost) {
		if (err) {
			return next(err);
		}

		res.render('./templates/singlePost', { blogpost: blogpost });

	})
})

router.delete('/:id', function (req, res, next) {
	BlogPost.findByIdAndRemove(req.params.id, function (err, blogpost) {
		if (err) {
			return next(err);
		}

		res.status(200).send('Deleted post sucessfully');
	})
})

module.exports = router;