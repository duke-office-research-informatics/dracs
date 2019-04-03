import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconDescription = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      role="img"
      aria-label="description icon"
    >
      <title>Description icon</title>
      <path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Icon>
  );
};

IconDescription.defaultProps = {
  size: 24,
  color: "#666",
};

IconDescription.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconDescription;
