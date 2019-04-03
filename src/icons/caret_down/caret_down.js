import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconCaretDown = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      height={props.size}
      width={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      aria-label="Down Icon"
      role="img"
      style={props.style}
    >
      <title>Down Icon</title>
      <desc>downward facing caret</desc>
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Icon>
  );
};

IconCaretDown.defaultProps = {
  color: "#666",
  size: 24,
};

IconCaretDown.propTypes = {
  className: propTypes.string,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
  size: propTypes.number,
  style: propTypes.object,
};

export default IconCaretDown;
