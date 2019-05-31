import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconCloseCircleFilled = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      role="img"
      aria-label="close icon"
    >
      <title>close icon</title>
      <desc>x</desc>
      <path
        d="M0 0h24v24H0z"
        fill={props.innerTextColor ? props.innerTextColor : "none"}
      />
      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
    </Icon>
  );
};

IconCloseCircleFilled.defaultProps = {
  size: 24,
  color: "#0680cd",
};

IconCloseCircleFilled.propTypes = {
  className: propTypes.string,
  innerTextColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconCloseCircleFilled;
