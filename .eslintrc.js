module.exports = {
  extends: ['plugin:prettier/recommended', 'plugin:playwright/playwright-test'],
  plugins: ['prettier', 'playwright'],
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        useTabs: false,
        tabWidth: 2
      }
    ],
    'no-console': 'off',
    'no-useless-escape': 'off',
    'no-eval': 'error',
    'no-multi-spaces': 'error',
    'comma-dangle': ['error', 'never'],
    'func-call-spacing': ['error', 'never'],
    'max-len': ['off', { code: 250, ignoreComments: true }],
    'new-parens': 'error',
    'arrow-spacing': ['error', { before: true, after: true }]
  }
}
