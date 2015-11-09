var mongoose = require('mongoose');
var config = require('../config/config');

module.exports = mongoose.model('blogPost', config.blogPostSchema);