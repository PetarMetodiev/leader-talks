var mongoose = require('mongoose');

// TODO: Rename filename to db

module.exports = {
	dbUrl: 'mongodb://localhost:27017/',
	dbName: 'test',
	blogPostSchema: new mongoose.Schema({
		title: { type: String, required: true },
		titlePicture: { type: String },
		content: { type: String, required: true },
		pictures: [String],
		date: { type: Date, default: Date.now }
	}),
	userSchema: new mongoose.Schema({
		username: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String, required: true },
		avatar: { type: String, required: true },
		role: { type: String, required: true }
	})
}