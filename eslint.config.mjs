import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const maxLinesTargets = [
  "src/app/**/*.{ts,tsx}",
  "src/containers/**/*.{ts,tsx}",
  "src/hooks/**/*.{ts,tsx}",
  "src/lib/**/*.{ts,tsx}",
  "src/providers/**/*.{ts,tsx}",
  "src/utils/**/*.{ts,tsx}",
];

const config = [
  {
    ignores: [".next/**", "node_modules/**", "public/**", "src/components/**"],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    files: maxLinesTargets,
    rules: {
      "max-lines": ["error", { max: 150, skipBlankLines: true, skipComments: true }],
    },
  },
];

export default config;
