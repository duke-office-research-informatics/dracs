import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconViewList = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      aria-label="switch to list view"
      role="img"
    >
      <title>list view switch icon</title>
      <desc>three rows each with a line and a dot next ot it</desc>
      <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Icon>
  );
};

IconViewList.defaultProps = {
  size: 24,
  color: "#666",
};

IconViewList.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconViewList;
