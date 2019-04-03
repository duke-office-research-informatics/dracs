import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconEmail = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      height={props.size}
      width={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      aria-label="Email Icon"
      role="img"
    >
      <title>Email Icon</title>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Icon>
  );
};

IconEmail.defaultProps = {
  color: "#666",
  size: 24,
};

IconEmail.propTypes = {
  className: propTypes.string,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
  size: propTypes.number,
};

export default IconEmail;
