import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconApps = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      role="img"
      aria-label="apps"
    >
      <title>apps</title>
      <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Icon>
  );
};

IconApps.defaultProps = {
  size: 24,
  color: "#666",
};

IconApps.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconApps;
