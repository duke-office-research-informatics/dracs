import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconAddCircle = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      aria-label="send icon"
      role="img"
      style={props.style}
    >
      <title>add icon</title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    </Icon>
  );
};

IconAddCircle.defaultProps = {
  size: 24,
  color: "#666",
};

IconAddCircle.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
  style: propTypes.object,
};

export default IconAddCircle;
