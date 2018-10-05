module.exports = {
  parser: "babel-eslint",
  plugins: [
    "flowtype",
    "prettier",
  ],
  extends: [
    "problems",
    "plugin:react/recommended",
    "plugin:flowtype/recommended",
    "plugin:import/warnings",
    "prettier",
  ],
  env: {
    "node": true,
    "es6" : true,
    "jest": true
  },
  parserOptions: {
    "sourceType": "module"
  },
  settings: {
    "react": {
      "flowVersion": "0.80"
    }
  },
  rules: {
    "prettier/prettier": [ // customizing prettier rules (unfortunately not many of them are customizable)
      "error",
      {
        singleQuote: true, 
        trailingComma: 'all',
        printWidth: 120,
      },
    ],
    "no-duplicate-imports": "off",
  },
};
