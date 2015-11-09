var mongoose = require('mongoose');
var config = require('../config/config');

module.exports = mongoose.model('user', config.userSchema);