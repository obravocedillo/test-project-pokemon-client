import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
    {
        ignores: ["node_modules/**"],
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.browser },
    },
    tseslint.configs.recommended,
    pluginVue.configs["flat/recommended"],
    {
        files: ["**/*.vue"],
        languageOptions: { parserOptions: { parser: tseslint.parser } },
    },
    {
        rules: {
            "vue/multi-word-component-names": "off",
            "vue/no-reserved-component-names": "off",
            "@typescript-eslint/no-explicit-any": "off",
        },
    },
    prettierConfig,
]);
