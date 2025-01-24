module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/__tests__/__configs__/setup.js'],
  testPathIgnorePatterns: ['<rootDir>/__tests__/__configs__'],
  transformIgnorePatterns: ['node_modules/(?!my-library-dir)/'], //TODO: improve this pattern

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
