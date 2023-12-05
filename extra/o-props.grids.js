// Basic Grid Props
export const basicGrids = (nbCols = 12) => {
  const grids = {};
  for (let i = 1; i <= nbCols; i++) {
    grids[`--grid-columns-${i}`] = `repeat(${i}, minmax(0, 1fr))`;
    grids[`--grid-rows-${i}`] = `repeat(${i}, minmax(0, 1fr))`;
  }
  return grids;
};

// Asymetrical Grids Props
export const asymetricalGrids = (maxParts = 5) => {
  const grids = {};
  for (let i = 1; i <= maxParts; i++) {
    for (let j = 1; j <= maxParts; j++) {
      if (i === j) continue;
      grids[`--grid-columns-${i}-${j}`] = `${i}fr ${j}fr`;
      grids[`--grid-rows-${i}-${j}`] = `${i}fr ${j}fr`;
    }
  }
  return grids;
};

// Flex Cards
export const flexCards = (nb = 3) => {
  const grids = {};
  for (let i = 1; i <= nb; i++) {
    grids[`--flex-card-width-${i}`] = `var(--size-header-${i})`;
    grids[`--flex-card-${i}`] = `0 1 var(--flex-card-width-${i})`;
    grids[`--flex-card-stretch-${i}`] = `1 1 var(--flex-card-width-${i})`;
  }
  return grids;
};

// Stack Props
export const stack = {
  "--stack-template": "auto 1fr auto",
};

// Holy Grail Props
export const holyGrail = {
  "--holy-grail-template": "auto 1fr auto / auto 1fr auto",
  "--holy-grail-template-areas":
    "head head head left main right foot foot foot",
};

// Sidebars
export const sidebars = (nb = 3) => {
  const grids = {};
  for (let i = 1; i <= nb; i++) {
    grids[`--left-sidebar-${i}`] = `minmax(var(--size-header-${i}), 25%) 1fr`;
    grids[`--right-sidebar-${i}`] = `1fr minmax(var(--size-header-${i}), 25%)`;
  }
  return grids;
};

// Headers and Footers
export const headersAndFooters = {
  "--grid-rows-header": "auto 1fr",
  "--grid-rows-footer": "1fr auto",
  "--grid-rows-header-and-footer": "auto 1fr auto",
};

// Ram-fit and Ram-fill Props
export const ramFitAndFill = (nb = 3) => {
  const grids = {};
  for (let i = 1; i <= nb; i++) {
    grids[
      `--ram-fit-${i}`
    ] = `repeat(auto-fit, minmax(var(--size-header-${i}), 1fr))`;
    grids[
      `--ram-fill-${i}`
    ] = `repeat(auto-fill, minmax(var(--size-header-${i}), 1fr))`;
  }
  return grids;
};

// Ram Props
export const ram = (nb = 12) => {
  const grids = {};
  for (let i = 2; i <= nb; i++) {
    grids[`--ram-${i}`] = `repeat(
      auto-fit,
      minmax(
        min(
          max(
            calc(100% / ${i} - (var(--gap-here, 0px) * ${(i-1)/i})),
            calc(
              (
                  min(
                      var(--container-width, 1e5px),
                      var(--oxy-page-width, 1440px)
                    ) -
                    (${i - 1} * var(--gap-here, 0px))
                ) /
                ${i + 1}
            )
          ),
          100%
        ),
        1fr
      )
    )`;
  }
  return grids;
};

const Grids = {
  ...basicGrids(),
  ...asymetricalGrids(),
  ...flexCards(),
  ...stack,
  ...holyGrail,
  ...sidebars(),
  ...headersAndFooters,
  ...ramFitAndFill(),
  ...ram(),
};

export default Grids;