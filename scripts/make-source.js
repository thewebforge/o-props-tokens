console.log("Building Source JS files...");
import fs from "fs";

// Open Props Original Extras
import OpAnimations from "open-props/src/props.animations.js";
import Aspects from "open-props/src/props.aspects.js";
import Borders from "open-props/src/props.borders.js";
import * as ColorsHSL from "open-props/src/props.colors-hsl.js";
import ColorHues from "open-props/src/props.colors-oklch-hues.js";
import ColorsOKLCH from "open-props/src/props.colors-oklch.js";
import * as Colors from "open-props/src/props.colors.js";
import Sizes from "open-props/src/props.sizes.js";
import ColorsOKLCHgray from "open-props/src/props.gray-oklch.js";
import OpFonts from "open-props/src/props.fonts.js";
import Easings from "open-props/src/props.easing.js";
import OpGradients from "open-props/src/props.gradients.js";
import Shadows from "open-props/src/props.shadows.js";
import OpSVG from "open-props/src/props.svg.js";
import Zindex from "open-props/src/props.zindex.js";
import MaskEdges from "open-props/src/props.masks.edges.js";
import MaskCornerCuts from "open-props/src/props.masks.corner-cuts.js";

// Custom Props Props Packs
import Duration from "../extra/o-props.durations.js";
import Grids from "../extra/o-props.grids.js";
import ObjectPosition from "../extra/o-props.object-position.js";
import Shadoweights from "../extra/o-props.shadoweights.js";
import UIGradients from "../extra/o-props.ui-gradients.js";

// Additions to Props Packs
import CustomAnimations from "../extra/o-props.animations.js";
import CustomFonts from "../extra/o-props.fonts.js";
import CustomGradients from "../extra/o-props.gradients.js";
import CustomSVG from "../extra/o-props.svg.js";

// Merge Props Packs
const Animations = { ...OpAnimations, ...CustomAnimations };
const Fonts = { ...OpFonts, ...CustomFonts };
const Gradients = { ...OpGradients, ...CustomGradients };
const SVG = { ...OpSVG, ...CustomSVG };

// Custom Media Queries
import { CustomMedia } from "open-props/src/props.media.js";
import { SupportsMedia } from "../extra/o-props.supports.js";

// Get args from command line
const [, , prefix = ""] = process.argv;
const pfx = prefix ? prefix + "-" : "";

const sets = {
  [`${pfx}props.colors.js`]: Colors,
  [`${pfx}props.colors-hsl.js`]: ColorsHSL,
};
const singles = {
  [`${pfx}props.animations.js`]: Animations,
  [`${pfx}props.aspect-ratios.js`]: Aspects,
  [`${pfx}props.borders.js`]: Borders,
  [`${pfx}props.colors-oklch-hues.js`]: ColorHues,
  [`${pfx}props.colors-oklch.js`]: ColorsOKLCH,
  [`${pfx}props.gray-oklch.js`]: ColorsOKLCHgray,
  [`${pfx}props.media.js`]: CustomMedia,
  [`${pfx}props.durations.js`]: Duration,
  [`${pfx}props.easing.js`]: Easings,
  [`${pfx}props.fonts.js`]: Fonts,
  [`${pfx}props.gradients.js`]: Gradients,
  [`${pfx}props.grids.js`]: Grids,
  [`${pfx}props.masks.edges.js`]: MaskEdges,
  [`${pfx}props.masks.corner-cuts.js`]: MaskCornerCuts,
  [`${pfx}props.object-position.js`]: ObjectPosition,
  [`${pfx}props.shadoweights.js`]: Shadoweights,
  [`${pfx}props.shadows.js`]: Shadows,
  [`${pfx}props.sizes.js`]: Sizes,
  [`${pfx}props.supports.js`]: SupportsMedia,
  [`${pfx}props.svg.js`]: SVG,
  [`${pfx}props.ui-gradients.js`]: UIGradients,
  [`${pfx}props.zindex.js`]: Zindex,
};

const individual_colors = Object.keys(Colors)
  .filter((exportName) => exportName !== "default")
  .reduce(
    (root, hueName) => ({
      ...root,
      [`${pfx}props.${hueName.toLowerCase()}.js`]: Colors[hueName],
    }),
    {}
  );

const individual_colors_hsl = Object.keys(ColorsHSL)
  .filter((exportName) => exportName !== "default")
  .reduce(
    (root, hueName) => ({
      ...root,
      [`${pfx}props.${hueName.toLowerCase()}-hsl.js`]: ColorsHSL[hueName],
    }),
    {}
  );

if (!fs.existsSync("../src")) fs.mkdirSync("../src");

Object.entries({
  ...singles,
  ...individual_colors,
  ...individual_colors_hsl,
}).forEach(([filename, props]) => {
  console.log("Building js source file " + filename + "...");
  const file = fs.createWriteStream("../src/" + filename);
  file.write(`export default {\n`);
  Object.entries(props).forEach(([prop, val]) => {
    if (prefix && prefix !== "''") {
      prop = `--${prefix}-` + prop.slice(2);
      if (typeof val == "string" && val.includes("(--"))
        val = val.replace(/\(--/g, `(--${prefix}-`);
    }

    // prefix animation name in value
    let value = `"${val}"`;

    if (
      prop.includes("animation") &&
      !prop.includes("-@") &&
      prefix &&
      prefix !== "''"
    )
      value = `"${prefix}-${val}"`;

    if (prop.includes("animation") && prop.includes("-@")) {
      let keyframesDef = val;
      let prefixedKeyframes =
        keyframesDef.slice(0, 12) + prefix + "-" + keyframesDef.slice(12);
      let keyframes =
        prefix && prefix !== "''" ? prefixedKeyframes : keyframesDef;
      value = `\`${keyframes}\``;
    }

    if (
      prop.includes("ease") ||
      prop.includes("gradient") ||
      prop.includes("mask") ||
      prop.includes("shadow") ||
      prop.includes("ram") ||
      prop.includes("atkinson") ||
      (typeof val === "string" && val.includes("url"))
    ) {
      value = `\`${val}\``;
    }
    file.write(`  "${prop}": ${value},\n`);
  });
  file.write("};\n");
  file.end();
});

Object.entries(sets).forEach(([filename, set]) => {
  console.log(
    `Building Colors${filename.includes("hsl") ? "HSL" : ""} source file...`
  );
  const colorsFile = fs.createWriteStream("../src/" + filename);
  Object.entries(set).forEach(([hue, def]) => {
    if (hue === "default") return;
    colorsFile.write(`export const ${hue} = {\n`);
    Object.entries(def).forEach(([prop, val]) => {
      if (prefix && prefix !== "''") {
        prop = `--${prefix}-` + prop.slice(2);
        if (typeof val == "string" && val.includes("(--"))
          val = val.replace(/\(--/g, `(--${prefix}-`);
      }
      // prefix prop name
      let value = `"${val}"`;
      colorsFile.write(`  "${prop}": ${value},\n`);
    });
    colorsFile.write("};\n\n");
  });
  colorsFile.write(
    `const Colors${filename.includes("hsl") ? "HSL" : ""} = {\n`
  );
  Object.keys(set)
    .filter((exportName) => exportName !== "default")
    .forEach((hue) => {
      colorsFile.write(`  ...${hue},\n`);
    });
  colorsFile.write(`};\n\nexport default Colors${filename.includes("hsl") ? "HSL" : ""};\n`);
  colorsFile.end();
});

// Make index.js
const index = fs.createWriteStream("../src/index.js");
index.write(`import Animations from "./${pfx}props.animations.js";\n`);
index.write(`import Aspects from "./${pfx}props.aspect-ratios.js";\n`);
index.write(`import Borders from "./${pfx}props.borders.js";\n`);
index.write(`import Colors from "./${pfx}props.colors.js";\n`);
index.write(`import ColorsHSL from "./${pfx}props.colors-hsl.js";\n`);
index.write(`import Durations from "./${pfx}props.durations.js";\n`);
index.write(`import Easings from "./${pfx}props.easing.js";\n`);
index.write(`import Fonts from "./${pfx}props.fonts.js";\n`);
index.write(`import Gradients from "./${pfx}props.gradients.js";\n`);
index.write(`import Grids from "./${pfx}props.grids.js";\n`);
index.write(`import MasksEdges from "./${pfx}props.masks.edges.js";\n`);
index.write(`import MasksCornerCuts from "./${pfx}props.masks.corner-cuts.js";\n`);
index.write(`import ObjectPosition from "./${pfx}props.object-position.js";\n`);
index.write(`import Shadoweights from "./${pfx}props.shadoweights.js";\n`);
index.write(`import Shadows from "./${pfx}props.shadows.js";\n`);
index.write(`import Sizes from "./${pfx}props.sizes.js";\n`);
index.write(`import Supports from "./${pfx}props.supports.js";\n`);
index.write(`import SVG from "./${pfx}props.svg.js";\n`);
index.write(`import UIGradients from "./${pfx}props.ui-gradients.js";\n`);
index.write(`import Zindex from "./${pfx}props.zindex.js";\n\n`);
index.write(`const camelize = text => {\n`);
index.write(`  text = text.replace(/[-]+(.)?/g, (_, c) => c \n`);
index.write(`    ? c.toUpperCase() \n`);
index.write(`    : '');\n`);
index.write(`  return text.substr(0, 1).toLowerCase() + text.substr(1);\n`);
index.write(`};\n\n`);
index.write(`const mapToObjectNotation = props => {\n`);
index.write(`  for (var prop in props)\n`);
index.write(`    props[camelize(prop)] = props[prop]\n`);
index.write(`  return props;\n`);
index.write(`};\n\n`);
index.write(`const O_Props = mapToObjectNotation({\n`);
index.write(`  ...Animations,\n`);
index.write(`  ...Aspects,\n`);
index.write(`  ...Borders,\n`);
index.write(`  ...Colors,\n`);
index.write(`  ...ColorsHSL,\n`);
index.write(`  ...Durations,\n`);
index.write(`  ...Easings,\n`);
index.write(`  ...Fonts,\n`);
index.write(`  ...Gradients,\n`);
index.write(`  ...Grids,\n`);
index.write(`  ...MasksEdges,\n`);
index.write(`  ...MasksCornerCuts,\n`);
index.write(`  ...ObjectPosition,\n`);
index.write(`  ...Shadoweights,\n`);
index.write(`  ...Shadows,\n`);
index.write(`  ...Sizes,\n`);
index.write(`  ...Supports,\n`);
index.write(`  ...SVG,\n`);
index.write(`  ...UIGradients,\n`);
index.write(`  ...Zindex,\n`);
index.write(`});\n\n`);
index.write(`export default O_Props;\n`);
index.end();
