import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconWarning = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      aria-label="warning"
      role="img"
    >
      <title>warning</title>
      <desc>triangle with exclamation mark in center</desc>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </Icon>
  );
};

IconWarning.defaultProps = {
  size: 24,
  color: "#ffd960",
};

IconWarning.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconWarning;
