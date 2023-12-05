export const fontFamilies = {
  "--font-atkinson": '"Atkinson Hyperlegible", var(--font-sans), sans-serif',
};

export const fluidCalculations = {
  // Intermediate calculations

  // Amplitude Font Sizes
  "--font-size-difference": "calc(var(--max-font-size) - var(--min-font-size))",

  // Amplitude Viewports
  "--viewport-difference":
    "calc(var(--max_viewport, 85) - var(--min_viewport, 30))",

  // Amplitude Viewports
  "--min-viewport-ratio": "calc(1rem * var(--min_viewport, 30) / 100)",
  "--size-difference-to-viewport-difference-ratio":
    "calc(100 * var(--font-size-difference) / var(--viewport-difference))",
  "--min-font-size-with-unit": "calc(1rem * var(--min-font-size))",

  // Main Props
  "--fluid-font":
    "clamp(max(calc(1rem * var(--stop-text-size)), calc(1rem * var(--min-font-size))), calc(var(--min-font-size-with-unit) + (1vw - var(--min-viewport-ratio)) * var(--size-difference-to-viewport-difference-ratio)), calc(1rem * var(--max-font-size)))",
  "--min-font-size":
    "calc( var(--max-font-size) / var(--desktop-to-mobile-ratio))",
};

// Building the multiplier scale

export const textScales = (nb = 8) => {
  const scales = {};
  scales[`--text-scale-ratio-e1`] = "var(--text-scale-ratio)";
  for (let i = 2; i <= nb; i++) {
    scales[`--text-scale-ratio-e${i}`] = `calc(var(--text-scale-ratio-e${i-1}) * var(--text-scale-ratio))`;
  }
  return scales;
}

// Building the font size scale

export const textSizes = (nb = 8, nbNeg = 3) => {
  const sizes = {};
  const negatives = [];
  for (let i = nbNeg+1; i >= 1; i--) {
    let name = "";
    for (let j = 1; j <= i; j++) {
      name += "0";
    }
    negatives.push(name);
  }
  negatives.map((neg, i) => {
    sizes[`--text-size-${neg}`] = `calc(var(--base-text-size) / var(--text-scale-ratio-e${negatives.length - (i+1)}))`;
  }
  );
  sizes[`--text-size-0`] = `var(--base-text-size)`;
  for (let i = 1; i <= nb; i++) {
    sizes[`--text-size-${i}`] = `calc(var(--base-text-size) * var(--text-scale-ratio-e${i}))`;
  }
  return sizes;
}

// Building the fluid font scale

export const fluidFonts = (nb = 8, nbNeg = 3, sub = true, container = true) => {
  const fonts = {};
  const negatives = [];
  for (let i = nbNeg+1; i >= 2; i--) {
    let name = "";
    for (let j = 1; j <= i; j++) {
      name += "0";
    }
    negatives.push(name);
  }
  negatives.map((neg) => {
    fonts[`--fluid-font-${neg}`] = `clamp(max(calc(1rem * var(--stop-text-size)), calc(1rem * calc( var(--text-size-${neg})) / var(--desktop-to-mobile-ratio))), calc(calc(1rem * calc( var(--text-size-${neg}) / var(--desktop-to-mobile-ratio))) + (1vw - var(--min-viewport-ratio)) * calc(100 * calc(var(--text-size-${neg}) - calc( var(--text-size-${neg}) / var(--desktop-to-mobile-ratio))) / var(--viewport-difference))), calc(1rem * var(--text-size-${neg})))`;
    if (container) {
      fonts[`--container-font-${neg}`] = `clamp(max(calc(1rem * var(--stop-text-size)), calc(1rem * calc( var(--text-size-${neg})) / var(--desktop-to-mobile-ratio))), calc(calc(1rem * calc( var(--text-size-${neg}) / var(--desktop-to-mobile-ratio))) + (4cqi - var(--min-viewport-ratio)) * calc(100 * calc(var(--text-size-${neg}) - calc( var(--text-size-${neg}) / var(--desktop-to-mobile-ratio))) / var(--viewport-difference))), calc(1rem * var(--text-size-${neg})))`;
    }
    if (sub) {
      fonts[`--fluid-font-${neg}-sub`] = `calc(var(--fluid-font-${neg}) / var(--text-subheading-ratio))`;
      if (container) {
        fonts[`--container-font-${neg}-sub`] = `calc(var(--container-font-${neg}) / var(--text-subheading-ratio))`;
      }
    }
  }
  );
  for (let i = 0; i <= nb; i++) {
    fonts[`--fluid-font-${i}`] = `clamp(max(calc(1rem * var(--stop-text-size)), calc(1rem * calc( var(--text-size-${i})) / var(--desktop-to-mobile-ratio))), calc(calc(1rem * calc( var(--text-size-${i}) / var(--desktop-to-mobile-ratio))) + (1vw - var(--min-viewport-ratio)) * calc(100 * calc(var(--text-size-${i}) - calc( var(--text-size-${i}) / var(--desktop-to-mobile-ratio))) / var(--viewport-difference))), calc(1rem * var(--text-size-${i})))`;
    if (container) {
      fonts[`--container-font-${i}`] = `clamp(max(calc(1rem * var(--stop-text-size)), calc(1rem * calc( var(--text-size-${i})) / var(--desktop-to-mobile-ratio))), calc(calc(1rem * calc( var(--text-size-${i}) / var(--desktop-to-mobile-ratio))) + (4cqi - var(--min-viewport-ratio)) * calc(100 * calc(var(--text-size-${i}) - calc( var(--text-size-${i}) / var(--desktop-to-mobile-ratio))) / var(--viewport-difference))), calc(1rem * var(--text-size-${i})))`;
    }
    if (sub) {
      fonts[`--fluid-font-${i}-sub`] = `calc(var(--fluid-font-${i}) / var(--text-subheading-ratio))`;
      if (container) {
        fonts[`--container-font-${i}-sub`] = `calc(var(--container-font-${i}) / var(--text-subheading-ratio))`;
      }
    }
  }
  return fonts;
}

const Fonts = {
  ...fontFamilies,
  ...fluidCalculations,
  ...textScales(),
  ...textSizes(),
  ...fluidFonts(),
};

export default Fonts;
