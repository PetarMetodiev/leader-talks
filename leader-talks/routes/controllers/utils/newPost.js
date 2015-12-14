var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var BlogPost = require('../../../models/blogPost');

module.exports = function(passport) {

	router.get('/', function(req, res, next) {
		var predefinedContent = {		// Probably should delete this.
			title: '',
			pictureURL: '',
			content: ''
		}

		res.render('./templates/newPost', {
			predefinedContent: predefinedContent
		});
	});

	router.post('/', function(req, res, next) {
		var newPostObj = {
			title: req.body.title,
			content: req.body.content,
			titlePicture: req.body.titlePicture || 'https://www.concrete.org/portals/0/files/images/bookstore/No_image_available.jpg'
		};

		// TODO: Validate if the Title image url leads to an existing image(e.g. if the responce is 200(OK)).

		var newPost = new BlogPost(newPostObj);
		newPost.save(function(err) {
			if (err) {
				return next(err);
			}

			res.redirect('/posts');
		})
	})


	return router;
}