import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconDropdownArrow = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      height={props.size}
      width={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      aria-label="Dropdown Arrow"
      role="img"
    >
      <title>Dropdown Arrow</title>
      <desc>downward facing triangle</desc>
      <path d="M7 10l5 5 5-5z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Icon>
  );
};

IconDropdownArrow.defaultProps = {
  color: "#666",
  size: 24,
};

IconDropdownArrow.propTypes = {
  className: propTypes.string,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
  size: propTypes.number,
};

export default IconDropdownArrow;
