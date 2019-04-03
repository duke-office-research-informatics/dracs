import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconChevLeft = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      role="img"
      aria-label="Chevron Left"
    >
      <title>Chevron Left</title>
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Icon>
  );
};

IconChevLeft.defaultProps = {
  color: "#0680cd",
  size: 24,
};

IconChevLeft.propTypes = {
  className: propTypes.string,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
  size: propTypes.number,
};

export default IconChevLeft;
