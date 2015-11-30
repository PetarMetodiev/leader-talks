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
			// bp.titlePicture = bp.titlePicture || 'https://www.concrete.org/portals/0/files/images/bookstore/No_image_available.jpg';
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

		blogpost.id = req.params.id;

		res.render('./templates/singlePost', { blogpost: blogpost });

	})
})

router.delete('/:id', function (req, res, next) {
	BlogPost.findByIdAndRemove(req.params.id, function (err, blogpost) {
		if (err) {
			return next(err);
		}

		res.status(200).send('Deleted post sucessfully');
	});
});

router.get('/update/:id', function (req, res, next) {
	BlogPost.findById(req.params.id, function (err, blogpost) {
		var predefinedContent = {
			title: blogpost.title,
			pictureURL: blogpost.titlePicture,
			content: blogpost.content,
			id: req.params.id,
			updateBlogpost: true
		}
		res.render('./templates/newPost', { predefinedContent: predefinedContent });
	})
});

router.post('/update/:id', function (req, res, next) {

	console.log('in the update controller');

	// TODO: Validate if the Title image url leads to an existing image(e.g. if the responce is 200(OK)).

	var newPostObj = {
		title: req.body.title,
		content: req.body.content,
		titlePicture: req.body.titlePicture || 'https://www.concrete.org/portals/0/files/images/bookstore/No_image_available.jpg'
	};

	BlogPost.findByIdAndUpdate(req.params.id, newPostObj, function (err, blogpost) {

		if (err) {
			return next(err);
		}

		res.redirect('/posts/' + req.params.id);
	})
});

module.exports = router;