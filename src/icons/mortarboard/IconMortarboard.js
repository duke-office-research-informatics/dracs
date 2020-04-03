import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconMortarboard = props => {
  return (
    <Icon
      className={props.className}
      style={props.style}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      role="img"
      enableBackground="new 0 0 24 24"
      aria-label="mortarboard icon"
    >
      <title>mortarboard icon</title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
    </Icon>
  );
};

IconMortarboard.defaultProps = {
  size: 24,
  color: "#0680cd",
};

IconMortarboard.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  style: propTypes.object,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconMortarboard;
