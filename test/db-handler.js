const mongoose = require('mongoose');

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
