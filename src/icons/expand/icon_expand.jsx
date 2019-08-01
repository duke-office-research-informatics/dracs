import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconExpand = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      height={props.size}
      width={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      aria-label="expand"
      role="img"
    >
      <title>expand</title>
      <defs>
        <path id="a" d="M0 0h24v24H0z" />
      </defs>
      <clipPath id="b">
        <use xLinkHref="#a" overflow="visible" />
      </clipPath>
      <path
        clip-path="url(#b)"
        d="M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6z"
      />
      <path clip-path="url(#b)" fill="none" d="M0 0h24v24H0z" />
    </Icon>
  );
};

IconExpand.defaultProps = {
  color: "#0680cd",
  size: 24,
};

IconExpand.propTypes = {
  className: propTypes.string,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
  size: propTypes.number,
};

export default IconExpand;
