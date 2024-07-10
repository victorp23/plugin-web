module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // Agrega esto para reconocer el entorno Node.js
    webextensions: true  // Agrega este entorno para reconocer las APIs de extensiones web
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    // Tus reglas personalizadas
  }
};
