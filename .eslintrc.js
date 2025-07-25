module.exports = {
  extends: ['expo', '@expo/eslint-config'],
  rules: {
    // Disable some rules that might be too strict for this project
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
};