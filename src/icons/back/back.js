import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconBackArrow = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      aria-label="Back Icon"
      role="img"
    >
      <title>Back Icon</title>
      <desc>Back Arrow</desc>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </Icon>
  );
};

IconBackArrow.defaultProps = {
  color: "#0680cd",
  size: 24,
};

IconBackArrow.propTypes = {
  className: propTypes.string,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
  size: propTypes.number,
};

export default IconBackArrow;
