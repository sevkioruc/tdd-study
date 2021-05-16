const express = require('express');
const router = express.Router();

const Todo = require('../models/Todo');

router.get('/todos', async (req, res) => {
	const todos = await Todo.find();
	res.status(200).json(todos);
});

module.exports = router;
