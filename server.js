const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const todoRoutes = require('./routes/todo-routes');

require('dotenv').config();

const app = express();

mongoose.connect(process.env.mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log('Connected to DB');
	})
	.catch((err) => {
		console.log('Connection failed');
	});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
	if (err)
		console.log(err);
});

app.use('/', todoRoutes);

module.exports = app;
