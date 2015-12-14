var express = require('express');
var router = express.Router();

// route definitions
var home = require('./controllers/home');
var calendar = require('./controllers/utils/calendar');
var donate = require('./controllers/utils/donate');
var pictures = require('./controllers/utils/pictures');
var blogPosts = require('./controllers/utils/blogPosts');
var newPost = require('./controllers/utils/newPost');

var auth = require('./controllers/auth');

var helpers = require('../config/passport/helpers');

module.exports = function(passport) {

    router.use('/auth', auth(passport));

    router.use('/', home(passport));

    router.use('/calendar', calendar(passport));

    router.use('/donate', donate(passport));

    router.use('/pictures', pictures(passport));

    router.use('/posts', blogPosts(passport));

    router.use('/newpost', helpers.isAuthenticated, helpers.isAdmin, newPost(passport));

    return router;
}