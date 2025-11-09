require('dotenv').config();

test('hello world!', () => {
	expect(process.env.TEST_VARIABLE).toBeDefined();
});