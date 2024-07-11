import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { tsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "error",
      "no-undef": "off",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/promise-function-async": "error",
      "no-else-return": "error",
      "react/function-component-definition": [
        2,
        {
          namedComponents: "function-declaration",
        },
      ],
    },
  },
];
