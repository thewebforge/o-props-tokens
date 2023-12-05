const linearURL =
  "https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json";
const uigradients = await (await fetch(linearURL)).json();

const linear = uigradients.reduce(
  (root, { name, colors }) => {
    root[`--gradient-${name.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "")}`] = `linear-gradient(var(--gradient-direction) var(--color-space),${colors.join(
      ","
    )})`;
    return root;
  }
);

export default {
  "--color-space": "",
  "--gradient-direction": "to bottom right",
  ...linear,
};
