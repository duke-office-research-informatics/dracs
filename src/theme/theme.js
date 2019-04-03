import colors from "./colors/colorTheme.js";

const theme = {
  colors,
  sizing: {
    base: 8,
    fontSize: 16,
    borderRadius: 4,
  },
  zIndex: {
    xs: 1,
    s: 10,
    md: 100,
    lg: 500,
    xl: 1000,
  },
  boxShadow: {
    shadow3px:
      "0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 1px 8px 0 rgba(0, 0, 0, 0.12)",
    shadow2px:
      "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    button: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    card: "0 1px 3px 0 rgba(0, 0, 0, 0.25)",
    header: "0 0 12px 0 rgba(0, 0, 0, 0.40)",
    zdepth5: "0 19px 60px rgba(0, 0, 0, 0.3), 0 15px 20px rgba(0, 0, 0, 0.22)",
  },
  flexboxgrid: {
    gutterWidth: 1, // rem
    outerMargin: 1, // rem
    container: {
      sm: 46, // rem
      md: 61, // rem
      lg: 76, // rem
    },
    breakpoints: {
      xs: 0, // em
      sm: 48, // em 768px --> phone
      md: 73.125, // em 1170px --> tablet
      lg: 90, // em 1440px --> laptop
    },
  },
};

export default theme;
