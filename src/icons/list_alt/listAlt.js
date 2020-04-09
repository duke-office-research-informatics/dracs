import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconListAlt = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      style={props.style}
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      role="img"
      aria-label="list alt"
    >
      <title>list alt</title>
      <path d="M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Icon>
  );
};

IconListAlt.defaultProps = {
  size: 24,
  color: "#666",
};

IconListAlt.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  style: propTypes.object,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconListAlt;
