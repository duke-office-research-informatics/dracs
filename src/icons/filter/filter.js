import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconFilter = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      role="img"
      aria-label="filter icon"
    >
      <title>filter icon</title>
      <desc>staggered lines</desc>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" />
    </Icon>
  );
};

IconFilter.defaultProps = {
  size: 24,
  color: "#666",
};

IconFilter.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconFilter;
