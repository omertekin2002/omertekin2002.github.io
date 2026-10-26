import { defineConfig } from "html-validate";

export default defineConfig({
  extends: ["html-validate:recommended"],
  rules: {
    // `<meta />` and `<meta>` are both valid HTML; the page mixes them and this is style, not correctness.
    "void-style": "off",
    // The hidden SVG icon sprite needs `position:absolute` inline so it takes no space before the stylesheet loads.
    "no-inline-style": ["error", { allowedProperties: ["display", "position"] }],
  },
});
