import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconPlane = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      role="img"
      aria-label="airplane"
    >
      <title>airplane</title>
      <path d="M10.18 9" />
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Icon>
  );
};

IconPlane.defaultProps = {
  size: 24,
  color: "#666",
};

IconPlane.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconPlane;
