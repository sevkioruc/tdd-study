const dbHandler = require('./db-handler');

describe('Todos', () => {
	/**
	 * Connect to a new database before running any tests.
	 */
	beforeAll(async () => await dbHandler.connect());

	/**
	 * Clear all test data after every test.
	 */
	afterEach(async () => await dbHandler.clearDatabase());

	/**
	 * Close the database connection
	 */
	afterAll(async () => await dbHandler.closeDatabase());

});
