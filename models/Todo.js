const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
	title: {
		type: String,
		require: true
	},
	content: {
		type: String,
		require: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Todo', todoSchema);
