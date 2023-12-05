export const SupportsMedia = {
  "--safariONLY": "(-apple-pay-button-style: inherit)",
  "--firefoxONLY": "(-moz-appearance: inherit)",
  "--firefoxMacONLY": "(-moz-osx-font-smoothing: inherit)",
  "--chromeONLY":
    "(-webkit-app-region: inherit) and (not (container-type: none))",
  "--chromiumONLY": "(-webkit-app-region: inherit) and (container-type: none)",
  "--webkitONLY": "(alt: inherit) and (not (-apple-pay-button-style: inherit))",
};
