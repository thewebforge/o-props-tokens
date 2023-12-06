const postcssPresetEnv = require("postcss-preset-env");
const postcssImport = require("postcss-import");
const cssnano = require("cssnano");
const combineSelectors = require("open-props/build/postcss-combine-selectors.cjs");
// const customSupports = require("./plugins/postcss-custom-supports.cjs");

const lib = process.env.npm_lifecycle_event;

const inlineMediaQueries = lib === "lib:media" || lib === "lib:supports";
// todo: inline MQs for 'lib:all' when it's supported better

module.exports = {
  plugins: [
    postcssImport(),
    postcssPresetEnv({
      stage: 0,
      autoprefixer: false,
      features: {
        "color-function": false,
        "color-functional-notation": false,
        "custom-media-queries": { preserve: inlineMediaQueries },
        "custom-properties": false,
        "double-position-gradients": false,
        "focus-visible-pseudo-class": false,
        "focus-within-pseudo-class": false,
        "gap-properties": false,
        "logical-properties-and-values": false,
        "not-pseudo-class": false,
        "place-properties": false,
        "prefers-color-scheme-query": false,
      },
    }),
    // customSupports(),
    combineSelectors(),
    cssnano({
      preset: "default",
    }),
  ],
};
