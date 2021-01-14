import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconCloseArrow = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      role="img"
      aria-label="close"
    >
      <title>close</title>
      <rect fill="none" height="24" width="24" />
      <path d="M22,3.41l-5.29,5.29L20,12h-8V4l3.29,3.29L20.59,2L22,3.41z M3.41,22l5.29-5.29L12,20v-8H4l3.29,3.29L2,20.59L3.41,22z" />
    </Icon>
  );
};

IconCloseArrow.defaultProps = {
  size: 24,
  color: "#0680cd",
};

IconCloseArrow.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconCloseArrow;
