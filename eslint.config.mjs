import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "**/.next/**",
    "node_modules/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // GENERATED — do not edit. Machine-written runtime/design-system bundles
    // shipped for the /tour-embed page; not code anyone here writes or maintains.
    "public/tour-embed/support.js",
    "public/tour-embed/_ds/**",
  ]),
]);

export default eslintConfig;
