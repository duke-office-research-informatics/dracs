import styledMap from "styled-map";
import colors from "../../theme/colors/colorTheme.js";

export const text = styledMap("inputState", {
  disabled: colors.base45pct,
  error: colors.error,
  primary: colors.base90pct,
});

export const placeholder = styledMap("inputState", {
  disabled: colors.base45pct,
  error: colors.base57pct,
  primary: colors.base57pct,
});

export const label = styledMap("inputState", {
  disabled: colors.base45pct,
  error: colors.error,
  primary: colors.base57pct,
});

export const labelFocus = styledMap("inputState", {
  disabled: colors.base45pct,
  error: colors.error,
  primary: colors.action87pct,
});

export const help = styledMap("inputState", {
  disabled: colors.base45pct,
  error: colors.error87pct,
  primary: colors.base57pct,
});

export const border = styledMap("inputState", {
  disabled: `dashed 1px ${colors.base45pct}`,
  error: "solid 1px " + colors.error,
  primary: `solid 1px ${colors.base57pct}`,
});

export const borderFocus = styledMap("inputState", {
  disabled: `dashed 1px ${colors.base45pct}`,
  error: "solid 2px " + colors.error,
  primary: "solid 2px " + colors.action,
});

export const textareaBorder = styledMap("inputState", {
  disabled: `solid 1px ${colors.base45pct}`,
  error: "solid 1px " + colors.error,
  primary: `solid 1px ${colors.base57pct}`,
});

export const textareaBorderFocus = styledMap("inputState", {
  disabled: `solid 1px ${colors.base45pct}`,
  error: "solid 2px " + colors.error,
  primary: "solid 2px " + colors.action,
});

export const inputMargin = styledMap({
  default: "26px 0 0 0",
  noLabel: "6px 0",
  dense: "14px 0 0 0",
});

export const inputLineHeight = styledMap({
  default: "30px",
  dense: "24px",
});

export const inputHeight = styledMap({
  default: "32px",
  dense: "26px",
});

export const elFontsize = styledMap({
  default: "16px",
  dense: "13px",
});

export const labelTop = styledMap({
  default: "8px",
  dense: "-6px",
});
export const labelTopFocus = styledMap({
  default: "-12px",
  dense: "-22px",
});

export const helpPadding = styledMap({
  default: "8px 0 0 0",
  dense: "4px 0 0 0",
});

export const iconRtTop = styledMap({
  default: "32px",
  dense: "16px",
});

export const iconRtTopNoLabel = styledMap({
  default: "10px",
  dense: "16px",
});
