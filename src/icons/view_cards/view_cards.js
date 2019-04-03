import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconViewCards = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      aria-label="switch to card view"
      role="img"
    >
      <title>card view switch icon</title>
      <desc>two rows that each contain three boxes</desc>
      <path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Icon>
  );
};

IconViewCards.defaultProps = {
  size: 24,
  color: "#666",
};

IconViewCards.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconViewCards;
