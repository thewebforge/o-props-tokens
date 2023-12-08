// Custom File from open-props props.js
// https://github.com/argyleink/open-props/blob/main/build/props.js

console.log("Building Props...");
import fs from "fs";

// Open Props Props Packs
import Animations from "../src/o-props.animations.js";
import Aspects from "../src/o-props.aspect-ratios.js";
import Borders from "../src/o-props.borders.js";
import * as Colors from "../src/o-props.colors.js";
import * as ColorsHSL from "../src/o-props.colors-hsl.js";
import ColorsNeon from "../src/o-props.colors-neon.js";
import ColorsOKLCH from "../src/o-props.colors-oklch.js";
import ColorsOKLCHgray from "../src/o-props.gray-oklch.js";
import ColorHues from "../src/o-props.colors-oklch-hues.js";
import Durations from "../src/o-props.durations.js";
import Easings from "../src/o-props.easing.js";
import Filters from "../src/o-props.filters.js";
import Fonts from "../src/o-props.fonts.js";
import Gradients from "../src/o-props.gradients.js";
import Grids from "../src/o-props.grids.js";
import MasksEdges from "../src/o-props.masks.edges.js";
import MasksCornerCuts from "../src/o-props.masks.corner-cuts.js";
import Noises from "../src/o-props.noises.js";
import ObjectPosition from "../src/o-props.object-position.js";
import Shadoweights from "../src/o-props.shadoweights.js";
import Shadows from "../src/o-props.shadows.js";
import Sizes from "../src/o-props.sizes.js";
import SVG from "../src/o-props.svg.js";
import UIGradients from "../src/o-props.ui-gradients.js";
import Zindex from "../src/o-props.zindex.js";
import CustomMedia from "../src/o-props.media.js";
import SupportsMedia from "../src/o-props.supports.js";

// Helpers
import { buildPropsStylesheet } from "./make-stylesheet.js";
import { buildCustomMediaPropsStylesheet } from "./make-custommedia-stylesheet.js";
import { toTokens } from "./make-tokens.js";
import { toFigmaTokens } from "./make-figmatokens.js";
import { toStyleDictionary } from "./make-style-dictionary.js";
import { mapToObjectNotation } from "./utils.js";

const [, , prefix = "", useWhere, customSubject = "", filePrefix = ""] =
  process.argv;

const subject = customSubject === "" ? "html" : customSubject;
const selector = useWhere === "true" ? `:where(${subject})` : subject;
const pfx = filePrefix ? filePrefix + "-" : "";

const O_Props = mapToObjectNotation({
  ...Animations,
  ...Aspects,
  ...Borders,
  ...Colors.default,
  ...ColorsHSL.default,
  ...ColorsNeon,
  ...ColorsOKLCH,
  ...ColorsOKLCHgray,
  ...ColorHues,
  ...Durations,
  ...Easings,
  ...Filters,
  ...Fonts,
  ...Gradients,
  ...Grids,
  ...MasksEdges,
  ...MasksCornerCuts,
  ...Noises,
  ...ObjectPosition,
  ...Shadoweights,
  ...Shadows,
  ...Sizes,
  ...SVG,
  ...UIGradients,
  ...Zindex,
}, prefix);

const mainbundle = {
  [`${pfx}props.aspect-ratios.css`]: Aspects,
  [`${pfx}props.animations.css`]: Animations,
  [`${pfx}props.borders.css`]: Borders,
  [`${pfx}props.colors.css`]: Colors.default,
  [`${pfx}props.colors-neon.css`]: ColorsNeon,
  [`${pfx}props.easing.css`]: Easings,
  [`${pfx}props.fonts.css`]: Fonts,
  [`${pfx}props.filters.css`]: Filters,
  [`${pfx}props.gradients.css`]: Gradients,
  [`${pfx}props.grids.css`]: Grids,
  [`${pfx}props.noises.css`]: Noises,
  [`${pfx}props.object-position.css`]: ObjectPosition,
  [`${pfx}props.shadoweights.css`]: Shadoweights,
  [`${pfx}props.shadows.css`]: Shadows,
  [`${pfx}props.sizes.css`]: Sizes,
  [`${pfx}props.svg.css`]: SVG,
  [`${pfx}props.zindex.css`]: Zindex,
};

const individual_colors = Object.keys(Colors)
  .filter((exportName) => exportName !== "default")
  .reduce(
    (root, hueName) => ({
      ...root,
      [`${pfx}props.${hueName.toLowerCase()}.css`]: Colors[hueName],
    }),
    {}
  );

const individual_colors_hsl = Object.keys(ColorsHSL)
  .filter((exportName) => exportName !== "default")
  .reduce(
    (root, hueName) => ({
      ...root,
      [`${pfx}props.${hueName.toLowerCase()}-hsl.css`]: ColorsHSL[hueName],
    }),
    {}
  );

const individuals = {
  [`${pfx}props.masks.edges.css`]: MasksEdges,
  [`${pfx}props.masks.corner-cuts.css`]: MasksCornerCuts,
  [`${pfx}props.durations.css`]: Durations,
  [`${pfx}props.ui-gradients.css`]: UIGradients,
};

const customMedia = {
  [`${pfx}props.media.css`]: CustomMedia,
  [`${pfx}props.supports.css`]: SupportsMedia,
};

// gen design tokens
const jsonbundle = Object.entries({
  ...Object.assign({}, ...Object.values(individual_colors)),
  ...Sizes,
  ...Easings,
  ...Zindex,
  ...Aspects,
  ...Noises,
  ...Filters,
  ...Gradients,
  ...Borders,
}).reverse();

if (!fs.existsSync("../dist")) fs.mkdirSync("../dist");

const designtokens = toTokens(jsonbundle);
const JSONtokens = fs.createWriteStream(`../dist/${pfx}props.tokens.json`);
JSONtokens.end(JSON.stringify(Object.fromEntries(designtokens), null, 2));

// gen style-dictionary tokens
const styledictionarytokens = toStyleDictionary(jsonbundle);
const StyleDictionaryTokens = fs.createWriteStream(
  `../dist/${pfx}props.style-dictionary-tokens.json`
);
StyleDictionaryTokens.end(JSON.stringify(styledictionarytokens, null, 2));

// gen figma tokens
const figmatokens = toFigmaTokens(jsonbundle);
const FigmaTokens = fs.createWriteStream(
  `../dist/${pfx}props.figma-tokens.json`
);
FigmaTokens.end(JSON.stringify(figmatokens, null, 2));

const figmatokensSYNC = { "o-props": { ...figmatokens } };
const FigmaTokensSync = fs.createWriteStream(
  `../dist/${pfx}props.figma-tokens.sync.json`
);
FigmaTokensSync.end(JSON.stringify(figmatokensSYNC, null, 2));

const JS = fs.createWriteStream(`../dist/${pfx}props.js`);
JS.end(`var O_Props = ${JSON.stringify(O_Props, null, 2)}`);

const ES = fs.createWriteStream(`../dist/${pfx}props.module.js`);
ES.end(`export default ${JSON.stringify(O_Props, null, 2)}`);

const CJS = fs.createWriteStream(`../dist/${pfx}props.cjs`);
CJS.end(`module.exports = ${JSON.stringify(O_Props, null, 2)}`);

// const UMD = fs.createWriteStream(`../dist/${pfx}props.umd.js`)
// UMD.end(`module.exports = ${JSON.stringify(toObject(), null, 2)}`)

// gen prop variants
Object.entries({
  ...mainbundle,
  ...individual_colors,
  ...individual_colors_hsl,
  ...individuals,
}).forEach(([filename, props]) => {
  buildPropsStylesheet({ filename, props }, { selector, prefix, pfx });
});

// gen custom media variants
Object.entries({
  ...customMedia,
}).forEach(([filename, props]) => {
  buildCustomMediaPropsStylesheet(
    { filename, props },
    { selector, prefix, pfx }
  );
});

// gen color hsl main file
buildPropsStylesheet(
  {
    filename: pfx + "props.colors-hsl.css",
    props: ColorsHSL.default,
  },
  { selector, prefix, pfx }
);

// gen color oklch files
buildPropsStylesheet(
  {
    filename: pfx + "props.colors-oklch.css",
    props: ColorsOKLCH,
  },
  {
    selector: useWhere === "true" ? `:where(*)` : "*",
    prefix,
    pfx,
  }
);
buildPropsStylesheet(
  {
    filename: pfx + "props.gray-oklch.css",
    props: ColorsOKLCHgray,
  },
  {
    selector: useWhere === "true" ? `:where(*)` : "*",
    prefix,
    pfx,
  }
);
buildPropsStylesheet(
  {
    filename: pfx + "props.colors-oklch-hues.css",
    props: ColorHues,
  },
  { selector, prefix, pfx }
);

if (!fs.existsSync("../src")) fs.mkdirSync("../src");

// gen index.css
const entry = fs.createWriteStream(
  `../src/${pfx.includes("shadow") ? "shadow." : ""}index.css`
);
entry.write(`@import './${pfx}props.media.css';
`);
Object.keys(mainbundle).forEach((filename) => {
  entry.write(`@import './${filename}';\n`);
});
entry.end();
