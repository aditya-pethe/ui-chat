module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/server/test/**/*.ts'], // <rootDir> is a token Jest replaces with the root of your directory.
  };
  