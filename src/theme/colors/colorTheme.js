import palette from "./colorPalette.js";
import somColorPalette from "./somColorPalette.js";

const colors = {
  base: palette.gray.dark, //base text color
  muted: palette.gray.light, //light grey subheading color
  border: palette.gray.lightest, //light border
  borderDark: palette.gray.lighter, //dark border (used in dashboard card border)
  subheading: palette.gray.medium, //dark grey subheading color
  action: palette.blue.mediumBlue, //blue used for buttons/actions
  actionHover: palette.blue.lightBlue, //blue used for hover state of buttons/actions
  darkBlue: palette.blue.darkBlue, //duke blue
  error: palette.status.red, //error red
  dashBG: palette.gray.bg, //base gray background (used in dashboard)
  bg: palette.gray.white, //white
  base90pct: palette.base90pct, //base text color 90% darkness - used in input / icons to meet material spec (rarely used elsewhere)
  base57pct: palette.base57pct, //base text color 57% darkness - used in input / icons to meet material spec (rarely used elsewhere)
  base45pct: palette.base45pct, //base text color 45% darkness - used in input / icons to meet material spec (rarely used elsewhere)
  action87pct: palette.action87pct, //base action color 87% darkness - used in input / icons to meet material spec (rarely used elsewhere)
  error87pct: palette.error87pct, //base text color 87% darkness - used in input / icons to meet material spec (rarely used elsewhere, can be used for error hover state)
  warning: palette.status.yellow, //yellow used in all warning labels
  tutorialHighlight: "rgb(255,215,0)", //brighter yellow used to highlight tooltips, etc
  statusGreen: palette.status.kellyGreen, //dark green used to indicate status that is not success (for instance the 'new' text in myresearchers)
  successGreen: "#4AC948", //lighter green used to indicate a success status in buttons and icons
  ironweed: palette.sg.purple, //purple used in some statuses that is available in the Duke styleguide
  magnolia: "#1D6363", //green used in some statuses that is available in the Dke styleguide
  som: somColorPalette,
};

export default colors;
