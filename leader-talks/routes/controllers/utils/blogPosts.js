var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var BlogPost = require('../../../models/blogPost');
var _ = require('underscore');

var helpers = require('../../../config/passport/helpers');

module.exports = function(passport) {

	router.get('/', function(req, res, next) {
		// BlogPost.find({}, function(err, blogPosts) {
		// 	if (err) {
		// 		return next(err);
		// 	}

		// 	var sortedBlogPosts = _.sortBy(blogPosts, function(bp) {
		// 		var relativeDate = moment(bp.date).calendar();
		// 		bp.relativeDate = relativeDate;

		// 		if (bp.updatedPost) {
		// 			var relativeUpdatedDate = moment(bp.updatedOn).calendar();
		// 			bp.relativeUpdatedDate = relativeUpdatedDate;
		// 		}

		// 		return -bp.date;
		// 	})

		// 	res.render('./templates/posts', {
		// 		blogPosts: sortedBlogPosts
		// 	});

		// });
		BlogPost.find({}).sort({
			'addedOn': -1
		}).exec(function(err, blogPosts) {
			if (err) {
				return next(err);
			}

			res.render('./templates/posts', {
				blogPosts: blogPosts
			})
		})
	});

	router.get('/:id', function(req, res, next) {
		BlogPost.findById(req.params.id, function(err, blogpost) {
			if (err) {
				return next(err);
			}

			blogpost.id = req.params.id;

			res.render('./templates/singlePost', {
				blogpost: blogpost
			});

		})
	})

	router.delete('/:id', helpers.isAuthenticated, helpers.isAdmin, function(req, res, next) {
		BlogPost.findByIdAndRemove(req.params.id, function(err, blogpost) {
			if (err) {
				return next(err);
			}

			res.status(200).send('Deleted post sucessfully');
		});
	});

	router.get('/update/:id', helpers.isAuthenticated, helpers.isAdmin, function(req, res, next) {
		BlogPost.findById(req.params.id, function(err, blogpost) {
			var predefinedContent = {
				title: blogpost.title,
				pictureURL: blogpost.titlePicture,
				content: blogpost.content,
				id: req.params.id,
				updateBlogpost: true
			}
			res.render('./templates/newPost', {
				predefinedContent: predefinedContent
			});
		})
	});

	router.post('/update/:id', helpers.isAuthenticated, helpers.isAdmin, function(req, res, next) {

		// TODO: Validate if the Title image url leads to an existing image(e.g. if the responce is 200(OK)). http://stackoverflow.com/a/18441636

		var newPostObj = {
			title: req.body.title,
			content: req.body.content,
			titlePicture: req.body.titlePicture || 'https://www.concrete.org/portals/0/files/images/bookstore/No_image_available.jpg',
			updatedPost: true,
			updatedOn: new Date()
		};

		BlogPost.findByIdAndUpdate(req.params.id, newPostObj, function(err, blogpost) {

			if (err) {
				return next(err);
			}

			res.redirect('/posts/' + req.params.id);
		})
	});


	return router;
}