import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconError = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      role="img"
      aria-label="error"
    >
      <title>error</title>
      <desc>!</desc>
      <path
        d="M0 0h24v24H0z"
        fill={props.innerTextColor ? props.innerTextColor : "none"}
      />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </Icon>
  );
};

IconError.defaultProps = {
  size: 24,
  color: "#666",
};

IconError.propTypes = {
  className: propTypes.string,
  innerTextColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconError;
