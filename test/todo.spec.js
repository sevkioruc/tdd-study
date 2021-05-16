const dbHandler = require('./db-handler');
const dummyTodos = require('./data/todo.json');

const request = require('supertest');
const app = require('../server');

describe('Todos', () => {
	/**
	 * Connect to a new database before running any tests.
	 */
	beforeAll(async () => await dbHandler.connect());

	/**
	 * Database being started with dummy data for each test
	 */
	beforeEach(async () => await dbHandler.initDatabase());

	/**
	 * Clear all test data after every test.
	 */
	afterEach(async () => await dbHandler.clearDatabase());

	/**
	 * Close the database connection
	 */
	afterAll(async () => await dbHandler.closeDatabase());

	it('It should get all todos', async () => {
		let tempTodo;
		const todos = [];

		const response = await request(app).get('/todos');

		response.body.forEach(todo => {
			tempTodo = {};
			tempTodo.title = todo.title;
			tempTodo.content = todo.content;
			todos.push(tempTodo);
		});

		expect(response.statusCode).toBe(200);
		expect(todos.length).toBe(4);
		expect(todos).toEqual(dummyTodos);
	});

	it('It be able to create a new item of todo', async () => {
		const response =
			await request(app)
				.post('/todos')
				.send({
					title: 'New title',
					content: 'New content'
				});

		expect(response.statusCode).toBe(201);
		expect(response.body.message).toBe('Todo was created successfully');

		const getResponse = await request(app).get('/todos');
		expect(getResponse.body.length).toBe(5);
	});

});
