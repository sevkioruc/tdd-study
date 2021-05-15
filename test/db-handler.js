const mongoose = require('mongoose');

const Todo = require('../models/Todo');
const dummyTodos = require('./data/todo.json');

require('dotenv').config();

module.exports.connect = async () => {
	const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }
	await mongoose.connect(process.env.mongoURI, mongoOptions);
}

module.exports.closeDatabase = async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
}

module.exports.clearDatabase = async () => {
	const collections = mongoose.connection.collections;

	for (const key in collections) {
		const collection = collections[key];
		await collection.deleteMany();
	}
}

module.exports.initDatabase = async () => {
	Todo.insertMany(dummyTodos)
		.then(() => console.log("Data inserted"))
		.catch(err => console.log(err));
}
