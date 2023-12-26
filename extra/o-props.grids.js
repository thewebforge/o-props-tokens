// Basic Grid Props
export const basicGrids = (nbCols = 12) => {
  const grids = {};
  for (let i = 1; i <= nbCols; i++) {
    grids[`--grid-${i}`] = `repeat(${i}, [col-start] minmax(0, 1fr) [col-end])`;
    // grids[`--grid-columns-${i}`] = `repeat(${i}, minmax(0, 1fr))`;
    // grids[`--grid-rows-${i}`] = `repeat(${i}, minmax(0, 1fr))`;
  }
  return grids;
};

// Asymetrical Grids Props
export const asymetricalGrids = (maxParts = 5) => {
  const grids = {};
  for (let i = 1; i <= maxParts; i++) {
    for (let j = 1; j <= maxParts; j++) {
      if (i === j) continue;
      grids[`--grid-${i}-${j}`] = `[left-col-start] ${i}fr [left-col-end right-col-start] ${j}fr [right-col-end]`;
      // grids[`--grid-columns-${i}-${j}`] = `${i}fr ${j}fr`;
      // grids[`--grid-rows-${i}-${j}`] = `${i}fr ${j}fr`;
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
  "--hstack-template": "[page-start left-sidebar-start] auto [left-sidebar-end content-start] 1fr [content-end right-sidebar-start] auto [right-sidebar-end page-end]",
  "--vstack-template": "[page-start header-start] auto [header-end content-start] 1fr [content-end footer-start] auto [footer-end page-end]",
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
    grids[`--left-sidebar-${i}`] = `[page-start sidebar-start] minmax(var(--size-header-${i}), 25%) [sidebar-end content-start] 1fr [content-end page-end]`;
    grids[`--right-sidebar-${i}`] = `[page-start content-start] 1fr [content-end sidebar-start] minmax(var(--size-header-${i}), 25%) [sidebar-end page-end]`;
  }
  return grids;
};

// Headers and Footers
export const headersAndFooters = {
  "--grid-rows-header": "auto 1fr",
  "--grid-rows-footer": "1fr auto",
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
