import fs from "fs";

if (!fs.existsSync("../src")) fs.mkdirSync("../src");

export const buildPropsStylesheet = (
  { filename, props },
  { selector, prefix, pfx }
) => {
  console.log("Building stylesheet " + filename + "...");
  const file = fs.createWriteStream("../src/" + filename);

  let appendedMeta = "";

  if (filename.includes("shadows") || filename.includes("animations")) {
    file.write(`@import './${pfx}props.media.css';\n\n`);
  }

  if (filename.includes("shadows")) {
    let dark_propsMeta = ``;
    let dark_props = Object.entries(props).filter(([prop, val]) =>
      prop.includes("-@media:dark")
    );

    if (filename.includes("fonts") || filename.includes("animations")) {
      selector = `:where(html,
        body,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        .ct-text-block,
        .brxe-text-basic,
        .brxe-text,
        [class*="o-sub"])`;
    }

    dark_props.forEach(([prop, val], index) => {
      let v = props[prop];
      let extract = prop.slice(4, prop.length - "-@media:dark".length);
      let p = `--${prefix}-${extract}`;

      dark_propsMeta += `    ${p}: ${val};${
        index !== dark_props.length - 1 ? "\n" : ""
      }`;
    });
    appendedMeta += `
@media (--${prefix}-OSdark) {
  ${selector} {
${dark_propsMeta}
  }
}`;
  }

  if (filename.includes("gradient")) {
    appendedMeta += `
@supports (background: linear-gradient(to right in oklab, #000, #fff)) {
  ${selector} {
    --${prefix}-color-space: in oklab;
  }
}`;
  }

  file.write(`${selector} {\n`);

  Object.entries(props).forEach(([prop, val]) => {
    if (prop.includes("-@")) return;

    if (prop.includes("animation")) {
      let keyframesDef = props[`${prop}-@`];
      appendedMeta += keyframesDef;
    }

    file.write(`  ${prop}: ${val};\n`);
  });

  if (filename.includes("animations")) {
    let dark_props = Object.entries(props).filter(([prop, val]) =>
      prop.includes("-@media:dark")
    );

    dark_props.forEach(([prop, val], index) => {
      let hasDarkKeyframe =
        prop.endsWith("-@media:dark") && val.trim().startsWith("@keyframe");
      if (hasDarkKeyframe) {
        appendedMeta += `
@media (--${prefix}-OSdark) {
  ${val.trim().replace(/\n/g, "\n  ")}
}`;
      }
    });
  }
  file.write("}\n");
  file.end(appendedMeta);
};
