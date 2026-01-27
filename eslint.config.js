const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

module.exports = [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      "curly": "warn",
      "eqeqeq": "warn",
      "no-throw-literal": "warn",
    },
  },
  {
    ignores: ["out/**", "dist/**", "**/*.d.ts", "node_modules/**", "generate-icon.js"],
  },
];
