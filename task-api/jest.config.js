module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  moduleFileExtensions: ['ts', 'js', 'json'],

  testMatch: ['**/*.spec.ts'],

  rootDir: './',

  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },

  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
};
