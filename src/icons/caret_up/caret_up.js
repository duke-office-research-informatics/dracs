import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconCaretUp = props => {
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
      <title>send icon</title>
      <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Icon>
  );
};

IconCaretUp.defaultProps = {
  size: 24,
  color: "#666",
};

IconCaretUp.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
  style: propTypes.object,
};

export default IconCaretUp;
