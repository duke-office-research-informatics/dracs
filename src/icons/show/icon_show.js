import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconShow = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      height={props.size}
      width={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      aria-label="Show"
      role="img"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </Icon>
  );
};

IconShow.defaultProps = {
  color: "#666",
  size: 24,
};

IconShow.propTypes = {
  className: propTypes.string,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
  size: propTypes.number,
};

export default IconShow;
