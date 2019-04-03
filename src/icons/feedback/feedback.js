import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconFeedback = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      role="img"
      aria-label="feedback icon"
      style={props.style}
    >
      <title>feedback icon</title>
      <desc>speech bubble with lines</desc>
      <path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10M6,7H18V9H6V7M6,11H15V13H6V11Z" />
    </Icon>
  );
};

IconFeedback.defaultProps = {
  size: 24,
  color: "#666",
};

IconFeedback.propTypes = {
  className: propTypes.string,
  style: propTypes.object,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconFeedback;
