console.log("Building Extras...");
import fs from "fs";

// Open Props Original Extras
import Brand from "open-props/src/extra/brand.css";
import Buttons from "open-props/src/extra/buttons.css";
import ButtonsLight from "open-props/src/extra/buttons.light.css";
import ButtonsDark from "open-props/src/extra/buttons.dark.css";
import Normalize from "open-props/src/extra/normalize.css";
import NormalizeDark from "open-props/src/extra/normalize.dark.css";
import NormalizeLight from "open-props/src/extra/normalize.light.css";
import NormalizeSrc from "open-props/src/extra/normalize.src.css";
import Theme from "open-props/src/extra/theme.css";
import ThemeDark from "open-props/src/extra/theme.dark.css";
import ThemeLight from "open-props/src/extra/theme.light.css";
import ThemeDarkSwitch from "open-props/src/extra/theme.dark.switch.css";
import ThemeLightSwitch from "open-props/src/extra/theme.light.switch.css";
import Utilities from "open-props/src/extra/utilities.css"; 

// Get args from command line
const [, , prefix = ""] = process.argv;
const pfx = prefix ? prefix + "-" : "";

const singles = {
  ["brand.css"]: Brand,
  ["buttons.css"]: Buttons,
  ["buttons.light.css"]: ButtonsLight,
  ["buttons.dark.css"]: ButtonsDark,
  ["normalize.css"]: Normalize,
  ["normalize.dark.css"]: NormalizeDark,
  ["normalize.light.css"]: NormalizeLight,
  ["normalize.src.css"]: NormalizeSrc,
  ["theme.css"]: Theme,
  ["theme.dark.css"]: ThemeDark,
  ["theme.light.css"]: ThemeLight,
  ["theme.dark.switch.css"]: ThemeDarkSwitch,
  ["theme.light.switch.css"]: ThemeLightSwitch,
  ["utilities.css"]: Utilities,
};

if (!fs.existsSync("../src/extra")) fs.mkdirSync("../src/extra");
Object.entries({
  ...singles,
}).forEach(([filename, content]) => {
  const text = fs.readFileSync(content, "utf8");
  const file = fs.createWriteStream(`../src/extra/${filename}`);
  const processedText = text
    .replace(/\.\.\/props/g, `../${prefix}-props`)
    .replace(/\.btn/g, `.${prefix}-btn`)
    .replace(/--_/g, `--${prefix}_`)
    .replace(/\(--(?!o)(?!_)/g, `(--${prefix}-`)
    .replace(/ --(?!o)(?!_)/g, ` --${prefix}-`);
  file.end(processedText);
});