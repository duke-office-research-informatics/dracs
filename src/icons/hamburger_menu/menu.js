import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconMenu = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      aria-label="open customize and profile menu"
      role="img"
    >
      <title>menu icon</title>
      <desc>hamburger menu icon</desc>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </Icon>
  );
};
IconMenu.defaultProps = {
  size: 24,
  color: "#fff",
};
IconMenu.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconMenu;
