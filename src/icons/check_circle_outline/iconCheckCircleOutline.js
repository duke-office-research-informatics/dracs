import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";
import theme from "../../theme/theme.js";

const IconCheckCircleOutline = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      aria-label="check-circle-outline"
      role="img"
    >
      <title>check circle</title>
      <desc>circle with checkmark in the center</desc>
      <path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z" />
      <path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    </Icon>
  );
};

IconCheckCircleOutline.defaultProps = {
  size: 24,
  color: theme.colors.action,
};

IconCheckCircleOutline.propTypes = {
  className: propTypes.string,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
  size: propTypes.number,
  style: propTypes.object,
};

export default IconCheckCircleOutline;
