import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    files: ["*.js", "*.mjs",],
    languageOptions: { 
      globals: globals.browser,
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "no-undef-init": "error",
      "no-undefined": "error",
      "no-dupe-else-if": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-duplicate-imports": "error",
      "no-empty": "error",
      "no-console": "error",
      "no-else-return": "error",
      "no-inline-comments": "error",
      "prefer-const": "warn",
      "prefer-destructuring": "warn",
      "require-await": "warn",
      "sort-imports": "warn",
      "strict": "error",
      "linebreak-style": ["error", "unix",],
      "comma-dangle": ["error", "always",],
      "max-lines-per-function": ["error", { max: 20, },],
    },
  },
  pluginJs.configs.recommended,
];
