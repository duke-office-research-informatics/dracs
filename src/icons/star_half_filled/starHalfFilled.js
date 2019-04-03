import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconStarHalfFilled = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      role="img"
      aria-label="star"
    >
      <title>star</title>
      <desc>half filled</desc>
      <defs>
        <path id="a" d="M0 0h24v24H0V0z" />
      </defs>
      <clipPath id="b">
        <use xLinkHref="#a" overflow="visible" />
      </clipPath>
      <path
        clipPath="url(#b)"
        d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
      />
    </Icon>
  );
};

IconStarHalfFilled.defaultProps = {
  size: 32,
  color: "#0680cd",
};

IconStarHalfFilled.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconStarHalfFilled;
