const express = require('express');
const router = express.Router();

const Todo = require('../models/Todo');

router.get('/todos', async (req, res) => {
	const todos = await Todo.find();
	res.status(200).json(todos);
});

router.post('/todos', async (req, res) => {
	const todo = new Todo(res.body);
	try {
		await todo.save();
		res.status(201).json({
			message: 'Todo was created successfully'
		});
	} catch (err) {
		res.status(400).json({
			err,
			message: 'Could not create todo'
		});
	}
});

module.exports = router;
