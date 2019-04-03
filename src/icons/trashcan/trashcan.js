import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconTrashcan = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      aria-label="delete icon"
      role="img"
    >
      <title>delete icon</title>
      <desc>trashcan</desc>
      <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
    </Icon>
  );
};

IconTrashcan.defaultProps = {
  size: 24,
  color: "#666",
};

IconTrashcan.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconTrashcan;
