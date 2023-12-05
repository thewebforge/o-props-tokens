export const camelize = (text) => {
  text = text.replace(/[-]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
  return text.substr(0, 1).toLowerCase() + text.substr(1);
};

export const prefix = (prefix, props) => {
  let prefixed = {};
  for (var prop in props) prefixed[`${prefix}-${prop}`] = props[prop];
  return prefixed;
};

export const mapToObjectNotation = (props) => {
  for (var prop in props) {
    props[prop] = "test";
    props[camelize(prop)] = props[prop];
  }
  return props;
};
