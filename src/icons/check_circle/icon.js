import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";
import theme from "../../theme/theme.js";

const IconCheckCircle = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      aria-label="check-circle"
      role="img"
    >
      <title>check circle</title>
      <desc>circle with checkmark in the center</desc>
      <path
        d="M0 0h24v24H0z"
        fill={props.innerTextColor ? props.innerTextColor : "none"}
      />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </Icon>
  );
};

IconCheckCircle.defaultProps = {
  size: 24,
  color: theme.colors.action,
};

IconCheckCircle.propTypes = {
  className: propTypes.string,
  innerTextColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
  size: propTypes.number,
  style: propTypes.object,
};

export default IconCheckCircle;
