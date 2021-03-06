var mongoose = require('mongoose');

// TODO: Rename filename to db

module.exports = {
	dbUrl: 'mongodb://localhost:27017/',
	dbName: 'test',
	dbTestUrl: 'mongodb://leader-talks:1234567890@ds029615.mongolab.com:29615/',
	dbTestName: 'leadertalks',
	blogPostSchema: new mongoose.Schema({
		title: {
			type: String,
			required: true
		},
		titlePicture: {
			type: String
		},
		content: {
			type: String,
			required: true
		},
		pictures: [String],
		addedOn: {
			type: Date,
			default: Date.now
		},
		updatedPost: Boolean,
		updatedOn: {
			type: Date
		}
	}),
	userSchema: new mongoose.Schema({
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		role: {
			type: String/*,
			required: true*/,
			default: 'user'
		}
	})
}