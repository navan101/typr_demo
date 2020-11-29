module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-self-assign': 'off',
    "prefer-const": 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'vue/no-parsing-error': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/no-unused-components': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/class-name-casing': 'off',
    '@typescript-eslint/camelcase': 'off',
    'no-var': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    'no-constant-condition': 'off',
    'no-extra-semi': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    'no-useless-catch': 'off',
    'no-control-regex': 'off'
  },
}
