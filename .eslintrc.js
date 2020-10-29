module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:import/recommended',
    'plugin:import/typescript',
    'airbnb-typescript',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  plugins: ['react-hooks', '@typescript-eslint/eslint-plugin'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.tsx'] }],
    'react/require-default-props': 'off',
    'no-param-reassign': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-nested-ternary': 'off',
  },
};
