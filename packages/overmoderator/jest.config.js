module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/.env'],
  testMatch: ['**/__tests__/**/*.test.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};