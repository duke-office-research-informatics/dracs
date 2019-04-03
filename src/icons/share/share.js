import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconShare = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      role="img"
      aria-label="share icon"
    >
      <title>share icon</title>
      <path d="M3,20c2.5-3.5,6-5.1,11-5.1V19l7-7l-7-7v4C7,10,4,15,3,20z" />
      <path fill="none" d="M24,24H0L0,0l24,0V24z" />
    </Icon>
  );
};

IconShare.defaultProps = {
  size: 32,
  color: "#0680cd",
};

IconShare.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconShare;
