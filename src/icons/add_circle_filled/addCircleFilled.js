import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconAddCircleFilled = props => {
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
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
    </Icon>
  );
};

IconAddCircleFilled.defaultProps = {
  size: 24,
  color: "#666",
};

IconAddCircleFilled.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
  style: propTypes.object,
};

export default IconAddCircleFilled;
