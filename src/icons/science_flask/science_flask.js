import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconScienceFlask = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      aria-label="flask"
      role="img"
    >
      <title>flask</title>
      <g>
        <rect fill="none" height="24" width="24" />
      </g>
      <g>
        <path d="M19.8,18.4L14,10.67V6.5l1.35-1.69C15.61,4.48,15.38,4,14.96,4H9.04C8.62,4,8.39,4.48,8.65,4.81L10,6.5v4.17L4.2,18.4 C3.71,19.06,4.18,20,5,20h14C19.82,20,20.29,19.06,19.8,18.4z" />
      </g>
    </Icon>
  );
};

IconScienceFlask.defaultProps = {
  size: 24,
  color: "#0680cd",
};

IconScienceFlask.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconScienceFlask;
