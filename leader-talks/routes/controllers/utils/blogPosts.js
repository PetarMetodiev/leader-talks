var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var BlogPost = require('../../../models/blogPost');
// var _ = require('underscore');

var helpers = require('../../../config/passport/helpers');

function returnPaginatedBlogposts(req, res, next) {
	var elementsOnPage = 5;
	var page = req.params.page || 1;
	var elementsToSkip = (page - 1) * elementsOnPage;
	var maxPage;

	BlogPost.count({}, function (err, count) {
		maxPage = Math.ceil(count / elementsOnPage);

		if (page < 1 || page > maxPage) {
			res.redirect('./');
		}

		BlogPost
			.find({})
			.sort({
				'addedOn': -1
			})
			.limit(elementsOnPage)
			.skip(elementsToSkip)
			.exec(function (err, blogPosts) {
				if (err) {
					return next(err);
				}

				res.render('./templates/posts', {
					blogPosts: blogPosts,
					currentPage: page,
					maxPage: maxPage
				});
			});
	});


}


module.exports = function (passport) {

	router.get('/', returnPaginatedBlogposts);
	router.get('/:page', returnPaginatedBlogposts);

	router.get('/single/:id', function (req, res, next) {
		BlogPost.findById(req.params.id, function (err, blogpost) {
			if (err) {
				return next(err);
			}

			blogpost.id = req.params.id;

			res.render('./templates/singlePost', {
				blogpost: blogpost
			});

		});
	});

	router.delete('/single/:id', helpers.isAuthenticated, helpers.isAdmin, function (req, res, next) {
		BlogPost.findByIdAndRemove(req.params.id, function (err, blogpost) {
			if (err) {
				return next(err);
			}

			res.status(200).send('Deleted post sucessfully');
		});
	});

	router.get('/single/update/:id', helpers.isAuthenticated, helpers.isAdmin, function (req, res, next) {
		BlogPost.findById(req.params.id, function (err, blogpost) {
			if (err) {
				return next(err);
			}
			var predefinedContent = {
				title: blogpost.title,
				pictureURL: blogpost.titlePicture,
				content: blogpost.content,
				id: req.params.id,
				updateBlogpost: true
			};
			res.render('./templates/newPost', {
				predefinedContent: predefinedContent
			});
		});
	});

	router.post('/single/update/:id', helpers.isAuthenticated, helpers.isAdmin, function (req, res, next) {

		// TODO: Validate if the Title image url leads to an existing image(e.g. if the responce is 200(OK)). http://stackoverflow.com/a/18441636

		var newPostObj = {
			title: req.body.title,
			content: req.body.content,
			titlePicture: req.body.titlePicture || 'https://www.concrete.org/portals/0/files/images/bookstore/No_image_available.jpg',
			updatedPost: true,
			updatedOn: new Date()
		};

		BlogPost.findByIdAndUpdate(req.params.id, newPostObj, function (err, blogpost) {

			if (err) {
				return next(err);
			}

			res.redirect('/posts/' + req.params.id);
		});
	});


	return router;
};