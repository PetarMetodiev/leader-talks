var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../../../models/user');

function returnPaginatedBlogposts(req, res, next) {
    var elementsOnPage = 5;
    var page = req.params.page || 1;
    var elementsToSkip = (page - 1) * elementsOnPage;
    var maxPage;

    User.count({}, function(err, count) {
        maxPage = Math.ceil(count / elementsOnPage);

        if (page < 1 || page > maxPage) {
            res.redirect('./');
        }

        User
            .find({})
            .sort({
                'addedOn': -1
            })
            .limit(elementsOnPage)
            .skip(elementsToSkip)
            .exec(function(err, users) {
                if (err) {
                    return next(err);
                }

                res.render('./templates/manageUsers', {
                    users: users,
                    currentPage: page,
                    maxPage: maxPage
                });
            });
    });


}

module.exports = function(passport) {

	router.get('/', returnPaginatedBlogposts);

    // router.get('/', function(req, res, next) {
    //     res.render('./templates/manageUsers');
    // });

    return router;
}