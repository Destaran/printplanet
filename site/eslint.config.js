import react from "eslint-plugin-react";

react.configs.recommended.plugins = { react };
react.configs.recommended.languageOptions = {
  parserOptions: react.configs.recommended.parserOptions,
};
delete react.configs.recommended.parserOptions;

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended
);

// export default [
//   react.configs.recommended,
//   {
//     files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
//     languageOptions: { parserOptions: { ecmaFeatures: { tsx: true } } },
//     plugins: react,
//     rules: {
//       "react/react-in-jsx-scope": "off",
//       "no-unused-vars": "error",
//       "no-undef": "off",
//       "no-else-return": "error",
//       "react/function-component-definition": [
//         2,
//         {
//           namedComponents: "function-declaration",
//         },
//       ],
//     },
//   },
// ];
