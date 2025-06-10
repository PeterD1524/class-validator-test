import * as eslint from "@eslint/js";
import * as tseslint from "typescript-eslint";

const config: tseslint.ConfigArray = tseslint.config(
  eslint.configs.recommended,
  // https://typescript-eslint.io/getting-started/typed-linting
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // Note: there should be no other properties in this object
    // https://eslint.org/docs/latest/use/configure/migration-guide#ignoring-files
    // https://github.com/eslint/eslint/discussions/17429
    ignores: ["dist"],
  },
);

export default config;
