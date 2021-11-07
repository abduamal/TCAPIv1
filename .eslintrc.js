module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    mocha: true
  },
  extends: [
    "plugin:react/recommended",
    "airbnb"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 8,
    sourceType: "module"
  },
  plugins: [
    'react'
  ],
  rules: {
    'comma-dangle': 0,
    quotes: 0
  }
};
