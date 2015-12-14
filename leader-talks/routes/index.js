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

// router.use('/auth', auth);

// routes
// router.use('/', home);

// router.use('/calendar', calendar);

// router.use('/donate', donate);

// router.use('/pictures', pictures);

// router.use('/posts', blogPosts);

// router.use('/newpost', newPost);

// module.exports = router;

module.exports = function(passport) {
    router.use('/auth', auth(passport));
    
    router.use('/', home(passport));

    router.use('/calendar', calendar(passport));

    router.use('/donate', donate(passport));

    router.use('/pictures', pictures(passport));

    router.use('/posts', blogPosts(passport));

    router.use('/newpost', newPost(passport));
    
    return router;
}