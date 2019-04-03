import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconSelectDate = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      aria-label="select date icon"
      role="img"
    >
      <title>select date icon</title>
      <desc>calendar</desc>
      <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Icon>
  );
};

IconSelectDate.defaultProps = {
  size: 24,
  color: "#0680cd",
};

IconSelectDate.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconSelectDate;
