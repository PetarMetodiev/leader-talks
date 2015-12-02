var mongoose = require('mongoose');
var config = require('../config/config');

// config.blogPostSchema.pre('save', function (done) {
// 	this.updatedOn
// })

module.exports = mongoose.model('blogPost', config.blogPostSchema);