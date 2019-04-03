import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconVerified = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      role="img"
      aria-label="verified icon"
    >
      <title>verified icon</title>
      <desc>checkmark inside shield</desc>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </Icon>
  );
};

IconVerified.defaultProps = {
  size: 24,
  color: "#666",
};

IconVerified.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconVerified;
