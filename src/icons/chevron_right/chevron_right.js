import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconChevRight = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      role="img"
      aria-label="chevron right"
    >
      <title>Chevron Right</title>
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Icon>
  );
};

IconChevRight.defaultProps = {
  color: "#0680cd",
  size: 24,
};

IconChevRight.propTypes = {
  className: propTypes.string,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
  size: propTypes.number,
};

export default IconChevRight;
