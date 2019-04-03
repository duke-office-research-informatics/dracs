import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconDownloadFile = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      height={props.size}
      width={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      aria-label="Download File"
      role="img"
    >
      <title>Download File</title>
      <desc>downward arrow pointing to a line</desc>
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Icon>
  );
};

IconDownloadFile.defaultProps = {
  color: "#666",
  size: 24,
};

IconDownloadFile.propTypes = {
  className: propTypes.string,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
  size: propTypes.number,
};

export default IconDownloadFile;
