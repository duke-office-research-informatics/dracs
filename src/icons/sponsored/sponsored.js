import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconSponsored = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      role="img"
      aria-label="sponsored icon"
    >
      <title>sponsored</title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z" />
    </Icon>
  );
};

IconSponsored.defaultProps = {
  size: 24,
  color: "#666",
};

IconSponsored.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconSponsored;
