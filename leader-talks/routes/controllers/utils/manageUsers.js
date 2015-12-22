var express = require('express');
var router = express.Router();
var User = require('../../../models/user');

function returnPaginatedBlogposts(req, res, next) {

    User
        .find({})
        .sort({
            'email': -1
        })
        .exec(
            function(err, users){
                if (err) {
                    return next(err);
                }

                res.render('./templates/manageUsers',{
                    users: users
                });
            }
        );


}

module.exports = function(passport) {

	router.get('/', returnPaginatedBlogposts);

    // router.get('/', function(req, res, next) {
    //     res.render('./templates/manageUsers');
    // });

    return router;
};