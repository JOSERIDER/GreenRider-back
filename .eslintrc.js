module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: [
    "prettier",
    'standard'
  ],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    "prettier",
    '@typescript-eslint'
  ],
  rules: {
    "prettier/prettier": "error"
  }
}
