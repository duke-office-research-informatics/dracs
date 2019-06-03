import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";
import theme from "../../theme/theme.js";

const IconAttestation = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      aria-label="attestation"
      role="img"
    >
      <title>attestation</title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12.45 16h2.09L9.43 3H7.57L2.46 16h2.09l1.12-3h5.64l1.14 3zm-6.02-5L8.5 5.48 10.57 11H6.43zm15.16.59l-8.09 8.09L9.83 16l-1.41 1.41 5.09 5.09L23 13l-1.41-1.41z" />
    </Icon>
  );
};

IconAttestation.defaultProps = {
  size: 24,
  color: theme.colors.action,
};

IconAttestation.propTypes = {
  className: propTypes.string,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
  size: propTypes.number,
  style: propTypes.object,
};

export default IconAttestation;
