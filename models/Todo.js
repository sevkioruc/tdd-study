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
	}
});

module.exports = mongoose.model('Todo', todoSchema);
