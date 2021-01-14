import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconExpandArrow = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      role="img"
      aria-label="expand"
    >
      <title>expand</title>
      <rect fill="none" height="24" width="24" />
      <polygon points="21,11 21,3 13,3 16.29,6.29 6.29,16.29 3,13 3,21 11,21 7.71,17.71 17.71,7.71" />
    </Icon>
  );
};

IconExpandArrow.defaultProps = {
  size: 24,
  color: "#0680cd",
};

IconExpandArrow.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconExpandArrow;
