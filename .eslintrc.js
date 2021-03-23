module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:jest/recommended'],
  overrides: [
    {
      files: ['e2e/**/*.js'],
      env: {
        jest: true,
        'jest/globals': true,
      },
      globals: {
        device: true,
        element: true,
        by: true,
        waitFor: true,
      },
    },
  ],
};
