import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconSwapHorizontalCircle = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      role="img"
      style={props.style}
      aria-label="swap"
    >
      <title>swap</title>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10zm-7-5.5l3.5 3.5-3.5 3.5V11h-4V9h4V6.5zm-6 11L5.5 14 9 10.5V13h4v2H9v2.5z" />
    </Icon>
  );
};

IconSwapHorizontalCircle.defaultProps = {
  size: 24,
  color: "#666",
};

IconSwapHorizontalCircle.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
  style: propTypes.object,
};

export default IconSwapHorizontalCircle;
